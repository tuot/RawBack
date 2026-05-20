import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = resolve(ROOT, "images/app-store");
const TMP_DIR = resolve(ROOT, ".tmp/app-store-screenshots");

const ASSETS = {
  icon: dataUri("public/icon/icon128.png"),
  ios1: dataUri("images/ios1.png"),
  ios2: dataUri("images/ios2.png"),
  ipad1: dataUri("images/ipad1.png"),
  ipad2: dataUri("images/ipad2.png"),
  mac1: dataUri("images/mac1.png"),
  mac2: dataUri("images/mac2.png"),
  mac3: dataUri("images/mac3.png"),
};

const IPHONE_SIZES = [
  { label: "iphone-6.9", w: 1320, h: 2868 },
  { label: "iphone-6.5", w: 1284, h: 2778 },
  { label: "iphone-6.3", w: 1206, h: 2622 },
  { label: "iphone-6.1", w: 1125, h: 2436 },
];

const IPAD_SIZES = [
  { label: "ipad-13", w: 2064, h: 2752 },
  { label: "ipad-12.9", w: 2048, h: 2732 },
];

const MAC_SIZES = [
  { label: "mac-2880x1800", w: 2880, h: 1800 },
];

const phoneSlides = [
  {
    id: "raw-to-repo",
    image: ASSETS.ios1,
    kicker: "RAWBACK",
    title: ["Back to", "the repo"],
    body: "Jump from any raw Git file to its repository page.",
    tone: "light",
    layout: "phoneHero",
  },
  {
    id: "one-tap-source",
    image: ASSETS.ios2,
    kicker: "MOBILE",
    title: ["Find source", "in one tap"],
    body: "Works in Safari with GitHub, GitLab, and Gitea.",
    tone: "blue",
    layout: "phoneFocus",
  },
];

const ipadSlides = [
  {
    id: "focus-friendly",
    image: ASSETS.ipad1,
    kicker: "IPAD",
    title: ["Read code", "without clutter"],
    body: "A quiet overlay appears only when you need it.",
    tone: "light",
    layout: "tabletHero",
  },
  {
    id: "multi-platforms",
    image: ASSETS.ipad2,
    kicker: "PLATFORMS",
    title: ["Your Git hosts", "covered"],
    body: "GitHub, GitLab, and Gitea raw pages all jump back.",
    tone: "dark",
    layout: "tabletFocus",
  },
];

const macSlides = [
  {
    id: "raw-to-repo",
    image: ASSETS.mac1,
    kicker: "SAFARI",
    title: ["Raw files", "with context"],
    body: "Bring source pages back to their repository view.",
    tone: "light",
    layout: "macSide",
  },
  {
    id: "clean-reading",
    image: ASSETS.mac2,
    kicker: "FOCUS",
    title: ["Clean reading", "stays clean"],
    body: "Low-distraction controls keep the page focused.",
    tone: "blue",
    layout: "macCenter",
  },
  {
    id: "dark-mode",
    image: ASSETS.mac3,
    kicker: "THEMES",
    title: ["Light or dark", "feels native"],
    body: "Follows your system theme for clear browsing.",
    tone: "dark",
    layout: "macSide",
  },
];

rmSync(TMP_DIR, { recursive: true, force: true });
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(TMP_DIR, { recursive: true });

for (const size of IPHONE_SIZES) {
  renderSet(size, phoneSlides, "iphone");
}

for (const size of IPAD_SIZES) {
  renderSet(size, ipadSlides, "ipad");
}

for (const size of MAC_SIZES) {
  renderSet(size, macSlides, "mac");
}

console.log(`Generated App Store screenshots in ${OUT_DIR}`);

function renderSet(size, slides, device) {
  const dir = resolve(OUT_DIR, size.label);
  mkdirSync(dir, { recursive: true });

  slides.forEach((slide, index) => {
    const number = String(index + 1).padStart(2, "0");
    const outFile = resolve(
      dir,
      `${number}-${slide.id}-en-${size.w}x${size.h}.png`,
    );
    const htmlFile = resolve(
      TMP_DIR,
      `${size.label}-${number}-${slide.id}.html`,
    );

    writeFileSync(htmlFile, pageHtml({ ...size, slide, device }), "utf8");
    screenshot(htmlFile, outFile, size);
    console.log(`${size.label}/${number}-${slide.id}`);
  });
}

function screenshot(htmlFile, outFile, { w, h }) {
  const result = spawnSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--hide-scrollbars",
      "--no-first-run",
      "--run-all-compositor-stages-before-draw",
      "--force-device-scale-factor=1",
      `--window-size=${w},${h}`,
      `--screenshot=${outFile}`,
      `file://${htmlFile}`,
    ],
    { stdio: "pipe" },
  );

  if (result.status !== 0) {
    const stderr = result.stderr?.toString() || "";
    throw new Error(`Chrome failed for ${outFile}\n${stderr}`);
  }
}

function pageHtml({ w, h, slide, device }) {
  const css = baseCss({ w, h, slide, device });
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=${w},height=${h},initial-scale=1" />
  <style>${css}</style>
</head>
<body>
  ${slideMarkup(slide, device)}
</body>
</html>`;
}

function slideMarkup(slide, device) {
  if (slide.layout === "phoneHero") return phoneHero(slide);
  if (slide.layout === "phoneFocus") return phoneFocus(slide);
  if (slide.layout === "tabletHero") return tabletHero(slide);
  if (slide.layout === "tabletFocus") return tabletFocus(slide);
  if (slide.layout === "macCenter") return macCenter(slide);
  if (device === "mac") return macSide(slide);
  return phoneHero(slide);
}

function brandBlock() {
  return `
    <div class="brand">
      <img class="icon" src="${ASSETS.icon}" alt="" />
      <div>
        <div class="name">RawBack</div>
        <div class="tag">Git raw navigation</div>
      </div>
    </div>`;
}

function caption(slide, extraClass = "") {
  return `
    <section class="caption ${extraClass}">
      <div class="kicker">${escapeHtml(slide.kicker)}</div>
      <h1>${slide.title.map(escapeHtml).join("<br />")}</h1>
      <p>${escapeHtml(slide.body)}</p>
    </section>`;
}

function phoneHero(slide) {
  return `
    <main class="canvas tone-${slide.tone}">
      <div class="halo halo-a"></div>
      <div class="halo halo-b"></div>
      ${brandBlock()}
      ${caption(slide)}
      <div class="phone-shot phone-main">
        <img src="${slide.image}" alt="" />
      </div>
    </main>`;
}

function phoneFocus(slide) {
  return `
    <main class="canvas tone-${slide.tone}">
      <div class="grid-glow"></div>
      ${brandBlock()}
      ${caption(slide, "caption-invert")}
      <div class="phone-shot phone-tilt">
        <img src="${slide.image}" alt="" />
      </div>
      <div class="proof-pill">GitHub / GitLab / Gitea</div>
    </main>`;
}

function tabletHero(slide) {
  return `
    <main class="canvas tone-${slide.tone}">
      <div class="halo halo-a"></div>
      ${brandBlock()}
      ${caption(slide)}
      <div class="tablet-shot tablet-main">
        <img src="${slide.image}" alt="" />
      </div>
    </main>`;
}

function tabletFocus(slide) {
  return `
    <main class="canvas tone-${slide.tone}">
      <div class="grid-glow"></div>
      ${brandBlock()}
      ${caption(slide, "caption-invert narrow-copy")}
      <div class="tablet-shot tablet-side">
        <img src="${slide.image}" alt="" />
      </div>
      <div class="platform-stack">
        <span>GitHub</span><span>GitLab</span><span>Gitea</span>
      </div>
    </main>`;
}

function macSide(slide) {
  return `
    <main class="canvas tone-${slide.tone}">
      <div class="halo halo-a"></div>
      ${brandBlock()}
      ${caption(slide, "mac-copy")}
      <div class="mac-shot mac-right">
        <img src="${slide.image}" alt="" />
      </div>
    </main>`;
}

function macCenter(slide) {
  return `
    <main class="canvas tone-${slide.tone}">
      <div class="grid-glow"></div>
      ${brandBlock()}
      ${caption(slide, "mac-copy caption-invert")}
      <div class="mac-shot mac-right mac-right-low">
        <img src="${slide.image}" alt="" />
      </div>
    </main>`;
}

function baseCss({ w, h, slide, device }) {
  const isPhone = device === "iphone";
  const isIpad = device === "ipad";
  const isMac = device === "mac";
  const short = Math.min(w, h);
  const fontBase = Math.round(w * (isMac ? 0.05 : isIpad ? 0.072 : 0.092));
  const bodySize = Math.round(w * (isMac ? 0.018 : isIpad ? 0.027 : 0.04));
  const radius = Math.round(short * (isMac ? 0.028 : 0.055));
  const shadow = isMac
    ? "0 58px 140px rgba(15, 23, 42, 0.25)"
    : "0 70px 160px rgba(15, 23, 42, 0.28)";

  return `
    * { box-sizing: border-box; }
    html, body {
      width: ${w}px;
      height: ${h}px;
      margin: 0;
      overflow: hidden;
      background: #f7fafc;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Hiragino Sans GB", sans-serif;
      color: #0f172a;
    }
    .canvas {
      position: relative;
      width: ${w}px;
      height: ${h}px;
      overflow: hidden;
      isolation: isolate;
    }
    .tone-light {
      background:
        radial-gradient(circle at 82% 16%, rgba(44, 123, 229, 0.19), transparent 28%),
        radial-gradient(circle at 12% 82%, rgba(255, 122, 24, 0.18), transparent 30%),
        linear-gradient(145deg, #f8fbff 0%, #eef6ff 44%, #fff8ef 100%);
    }
    .tone-blue {
      background:
        radial-gradient(circle at 72% 12%, rgba(126, 211, 33, 0.28), transparent 28%),
        radial-gradient(circle at 8% 88%, rgba(255, 130, 36, 0.28), transparent 32%),
        linear-gradient(145deg, #0f172a 0%, #12335f 52%, #0d9488 100%);
      color: white;
    }
    .tone-dark {
      background:
        radial-gradient(circle at 86% 16%, rgba(34, 197, 94, 0.28), transparent 26%),
        radial-gradient(circle at 8% 90%, rgba(249, 115, 22, 0.28), transparent 30%),
        linear-gradient(145deg, #080d18 0%, #101827 55%, #182032 100%);
      color: white;
    }
    .halo {
      position: absolute;
      border-radius: 9999px;
      filter: blur(${Math.round(short * 0.035)}px);
      opacity: 0.74;
      z-index: -1;
    }
    .halo-a {
      width: ${Math.round(short * 0.36)}px;
      height: ${Math.round(short * 0.36)}px;
      right: ${Math.round(w * -0.05)}px;
      top: ${Math.round(h * 0.12)}px;
      background: rgba(37, 99, 235, 0.2);
    }
    .halo-b {
      width: ${Math.round(short * 0.28)}px;
      height: ${Math.round(short * 0.28)}px;
      left: ${Math.round(w * -0.07)}px;
      bottom: ${Math.round(h * 0.12)}px;
      background: rgba(249, 115, 22, 0.18);
    }
    .grid-glow {
      position: absolute;
      inset: 0;
      opacity: 0.22;
      background-image:
        linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px);
      background-size: ${Math.round(short * 0.062)}px ${Math.round(short * 0.062)}px;
      mask-image: radial-gradient(circle at 55% 40%, black, transparent 66%);
      z-index: -1;
    }
    .brand {
      position: absolute;
      top: ${Math.round(h * (isMac ? 0.07 : 0.05))}px;
      left: ${Math.round(w * (isMac ? 0.06 : 0.07))}px;
      display: flex;
      align-items: center;
      gap: ${Math.round(w * (isMac ? 0.012 : 0.026))}px;
      z-index: 10;
    }
    .icon {
      width: ${Math.round(w * (isMac ? 0.052 : isIpad ? 0.08 : 0.11))}px;
      height: ${Math.round(w * (isMac ? 0.052 : isIpad ? 0.08 : 0.11))}px;
      border-radius: ${Math.round(w * (isMac ? 0.011 : 0.024))}px;
      box-shadow: 0 18px 52px rgba(15, 23, 42, 0.18);
      background: #0f172a;
    }
    .name {
      font-size: ${Math.round(w * (isMac ? 0.024 : isIpad ? 0.038 : 0.047))}px;
      line-height: 1;
      font-weight: 800;
    }
    .tag {
      margin-top: ${Math.round(h * 0.004)}px;
      font-size: ${Math.round(w * (isMac ? 0.011 : isIpad ? 0.017 : 0.023))}px;
      line-height: 1.2;
      color: color-mix(in srgb, currentColor 62%, transparent);
      font-weight: 650;
    }
    .caption {
      position: absolute;
      top: ${Math.round(h * (isMac ? 0.22 : 0.17))}px;
      left: ${Math.round(w * (isMac ? 0.06 : 0.07))}px;
      width: ${Math.round(w * (isMac ? 0.34 : isIpad ? 0.72 : 0.80))}px;
      z-index: 10;
    }
    .kicker {
      font-size: ${Math.round(w * (isMac ? 0.014 : isIpad ? 0.024 : 0.032))}px;
      line-height: 1;
      font-weight: 850;
      color: ${slide.tone === "light" ? "#2563eb" : "#8ee7ff"};
      margin-bottom: ${Math.round(h * 0.018)}px;
    }
    h1 {
      margin: 0;
      font-size: ${fontBase}px;
      line-height: 0.98;
      font-weight: 900;
      letter-spacing: 0;
    }
    p {
      width: ${Math.round(w * (isMac ? 0.3 : isIpad ? 0.52 : 0.72))}px;
      margin: ${Math.round(h * 0.024)}px 0 0;
      font-size: ${bodySize}px;
      line-height: 1.33;
      color: ${slide.tone === "light" ? "#475569" : "rgba(255,255,255,0.78)"};
      font-weight: 600;
    }
    .caption-invert p { color: rgba(255,255,255,0.78); }
    .narrow-copy p {
      width: ${Math.round(w * (isIpad ? 0.29 : 0.32))}px;
    }
    .phone-shot,
    .tablet-shot,
    .mac-shot {
      position: absolute;
      overflow: hidden;
      border-radius: ${radius}px;
      box-shadow: ${shadow};
      background: white;
    }
    .phone-shot img,
    .tablet-shot img,
    .mac-shot img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .phone-main {
      width: ${Math.round(w * 0.8)}px;
      height: ${Math.round(w * 0.8 * 2868 / 1320)}px;
      left: ${Math.round(w * 0.1)}px;
      bottom: ${Math.round(h * -0.16)}px;
    }
    .phone-tilt {
      width: ${Math.round(w * 0.72)}px;
      height: ${Math.round(w * 0.72 * 2868 / 1320)}px;
      right: ${Math.round(w * -0.02)}px;
      bottom: ${Math.round(h * -0.1)}px;
      transform: rotate(-4deg);
      transform-origin: center bottom;
    }
    .proof-pill {
      position: absolute;
      left: ${Math.round(w * 0.07)}px;
      bottom: ${Math.round(h * 0.11)}px;
      padding: ${Math.round(h * 0.014)}px ${Math.round(w * 0.044)}px;
      border-radius: 9999px;
      background: rgba(255,255,255,0.14);
      border: 1px solid rgba(255,255,255,0.22);
      color: rgba(255,255,255,0.9);
      font-size: ${Math.round(w * 0.03)}px;
      font-weight: 760;
      backdrop-filter: blur(24px);
    }
    .tablet-main {
      width: ${Math.round(w * 0.84)}px;
      height: ${Math.round(w * 0.84 * 2752 / 2064)}px;
      left: ${Math.round(w * 0.08)}px;
      bottom: ${Math.round(h * -0.19)}px;
    }
    .tablet-side {
      width: ${Math.round(w * 0.74)}px;
      height: ${Math.round(w * 0.74 * 2752 / 2064)}px;
      right: ${Math.round(w * -0.05)}px;
      bottom: ${Math.round(h * -0.08)}px;
    }
    .platform-stack {
      position: absolute;
      left: ${Math.round(w * 0.07)}px;
      bottom: ${Math.round(h * 0.14)}px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${Math.round(w * 0.014)}px;
      z-index: 20;
    }
    .platform-stack span {
      padding: ${Math.round(h * 0.012)}px ${Math.round(w * 0.03)}px;
      border-radius: 999px;
      background: rgba(255,255,255,0.13);
      border: 1px solid rgba(255,255,255,0.22);
      font-size: ${Math.round(w * 0.022)}px;
      font-weight: 760;
      color: rgba(255,255,255,0.92);
    }
    .mac-copy {
      top: ${Math.round(h * 0.29)}px;
      width: ${Math.round(w * 0.32)}px;
    }
    .mac-top {
      top: ${Math.round(h * 0.18)}px;
      width: ${Math.round(w * 0.72)}px;
    }
    .mac-top p {
      width: ${Math.round(w * 0.46)}px;
    }
    .mac-right {
      width: ${Math.round(w * 0.61)}px;
      height: ${Math.round(w * 0.61 * 1732 / 3024)}px;
      right: ${Math.round(w * -0.02)}px;
      top: ${Math.round(h * 0.28)}px;
      border-radius: ${Math.round(short * 0.022)}px;
    }
    .mac-right-low {
      width: ${Math.round(w * 0.58)}px;
      height: ${Math.round(w * 0.58 * 1735 / 3024)}px;
      top: ${Math.round(h * 0.31)}px;
    }
    .mac-bottom {
      width: ${Math.round(w * 0.76)}px;
      height: ${Math.round(w * 0.76 * 1735 / 3024)}px;
      left: ${Math.round(w * 0.12)}px;
      bottom: ${Math.round(h * 0.08)}px;
      border-radius: ${Math.round(short * 0.022)}px;
    }
  `;
}

function dataUri(path) {
  const absolute = resolve(ROOT, path);
  const ext = absolute.endsWith(".png") ? "png" : "octet-stream";
  return `data:image/${ext};base64,${readFileSync(absolute).toString("base64")}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
