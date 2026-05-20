// tests/banner.test.ts
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

// node_modules/.pnpm/@wxt-dev+browser@0.1.42/node_modules/@wxt-dev/browser/src/index.mjs
var browser = globalThis.browser?.runtime?.id ? globalThis.browser : globalThis.chrome;

// node_modules/.pnpm/wxt@0.20.26_@types+node@25.8.0_jiti@2.7.0_rolldown@1.0.1/node_modules/wxt/dist/browser.mjs
var browser2 = browser;

// utils/i18n.ts
var messages = {
  en: {
    extensionDescription: "Jump from raw Git hosting files back to their repository pages.",
    bannerAriaLabel: "RawBack repository navigation",
    openRepositoryFileAriaLabel: "View this file in the repository",
    openInRepository: "View in repository",
    dismissThisFile: "Hide this file",
    hiddenFiles: "Hidden files",
    hiddenFilesEmpty: "No permanently hidden files.",
    restore: "Restore",
    restored: "Restored",
    enabled: "Enabled",
    disabled: "Disabled",
    currentPage: "Current page",
    rawPage: "Raw file detected",
    notRawPage: "This page is not a raw file.",
    openRepository: "Open repository",
    appearance: "Appearance",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    platforms: "Platforms",
    language: "Language",
    languageAuto: "Auto",
    languageEnglish: "English",
    languageChinese: "Chinese",
    customDomains: "Custom Domains",
    customDomainsHint: "Enter domain or URL",
    add: "Add",
    invalidDomain: "Invalid domain or URL",
    save: "Save",
    settingsSaved: "Saved"
  },
  zh_CN: {
    extensionDescription: "\u4ECE Git raw \u6587\u4EF6\u9875\u9762\u4E00\u952E\u56DE\u5230\u5BF9\u5E94\u4ED3\u5E93\u9875\u9762\u3002",
    bannerAriaLabel: "RawBack \u4ED3\u5E93\u5BFC\u822A",
    openRepositoryFileAriaLabel: "\u5728\u4ED3\u5E93\u4E2D\u67E5\u770B\u5F53\u524D\u6587\u4EF6",
    openInRepository: "\u5728\u4ED3\u5E93\u4E2D\u67E5\u770B",
    dismissThisFile: "\u9690\u85CF\u6B64\u6587\u4EF6",
    hiddenFiles: "\u5DF2\u9690\u85CF\u6587\u4EF6",
    hiddenFilesEmpty: "\u6CA1\u6709\u6C38\u4E45\u9690\u85CF\u7684\u6587\u4EF6\u3002",
    restore: "\u6062\u590D",
    restored: "\u5DF2\u6062\u590D",
    enabled: "\u5DF2\u542F\u7528",
    disabled: "\u5DF2\u7981\u7528",
    currentPage: "\u5F53\u524D\u9875\u9762",
    rawPage: "\u5DF2\u8BC6\u522B raw \u6587\u4EF6",
    notRawPage: "\u5F53\u524D\u9875\u9762\u4E0D\u662F raw \u6587\u4EF6\u3002",
    openRepository: "\u6253\u5F00\u4ED3\u5E93",
    appearance: "\u5916\u89C2",
    theme: "\u4E3B\u9898",
    themeSystem: "\u8DDF\u968F\u7CFB\u7EDF",
    themeLight: "\u4EAE\u8272",
    themeDark: "\u6697\u8272",
    platforms: "\u5E73\u53F0\u7BA1\u7406",
    language: "\u8BED\u8A00",
    languageAuto: "\u8DDF\u968F\u7CFB\u7EDF",
    languageEnglish: "English",
    languageChinese: "\u4E2D\u6587",
    customDomains: "\u81EA\u5B9A\u4E49\u79C1\u6709\u57DF\u540D",
    customDomainsHint: "\u8F93\u5165\u57DF\u540D\u6216\u5305\u542B\u8BE5\u57DF\u540D\u7684URL",
    add: "\u6DFB\u52A0",
    invalidDomain: "\u65E0\u6548\u7684\u57DF\u540D\u6216URL",
    save: "\u4FDD\u5B58",
    settingsSaved: "\u5DF2\u4FDD\u5B58"
  }
};
function t(key, language = "auto") {
  if (language !== "auto") return messages[language][key];
  const i18n = browser2.i18n;
  return i18n.getMessage(key) || messages.en[key];
}

// entrypoints/content/bannerViewModel.ts
function createBannerViewModel(info, language) {
  return {
    platformInitials: platformMark(info.platform),
    platformLabel: platformName(info.platform),
    repositoryLabel: `${info.user} / ${info.repo}`,
    filePath: info.filePath,
    primaryActionLabel: t("openInRepository", language),
    primaryActionAriaLabel: t("openRepositoryFileAriaLabel", language),
    primaryActionUrl: info.fileUrl,
    repositoryOrigin: getOrigin(info.fileUrl)
  };
}
function getOrigin(url) {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}
function platformName(platform) {
  if (platform === "github") return "GitHub";
  if (platform === "gitlab") return "GitLab";
  if (platform === "gitea") return "Gitea";
  return "";
}
function platformMark(platform) {
  if (platform === "github") return "GH";
  if (platform === "gitlab") return "GL";
  if (platform === "gitea") return "GT";
  return "";
}

// entrypoints/content/styles/bannerStyles.ts
var bannerCss = `
#rawback-banner-host {
  all: initial;
  color-scheme: light dark;
  display: block;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  height: 48px;
  -webkit-user-select: none;
  user-select: none;
}



.rawback-banner,
.rawback-banner * {
  -webkit-user-select: none;
  user-select: none;
}

.rawback-banner {
  align-items: center;
  backdrop-filter: saturate(180%) blur(14px);
  background: var(--rawback-bg);
  border-bottom: 1px solid var(--rawback-border);
  box-sizing: border-box;
  color: var(--rawback-fg);
  display: grid;
  gap: 12px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  left: 0;
  min-height: 48px;
  opacity: 0;
  padding: 7px 24px;
  position: fixed;
  right: 0;
  box-shadow: 0 1px 2px var(--rawback-shadow);
  top: 0;
  transform: translateY(-4px);
  transition: opacity 160ms ease, transform 160ms ease;
  width: 100vw;
  z-index: 2147483647;
}

#rawback-banner-host[data-mounted="true"] .rawback-banner {
  opacity: 1;
  transform: translateY(0);
}

#rawback-banner-host[data-theme="light"] {
  --rawback-bg: rgba(255, 255, 255, 0.92);
  --rawback-fg: #1f2328;
  --rawback-muted: #57606a;
  --rawback-border: rgba(208, 215, 222, 0.85);
  --rawback-button-bg: #1f6feb;
  --rawback-button-fg: #ffffff;
  --rawback-button-hover: #1158c7;
  --rawback-mark-bg: #f6f8fa;
  --rawback-mark-border: #d0d7de;
  --rawback-menu-bg: #ffffff;
  --rawback-menu-hover: #f6f8fa;
  --rawback-menu-shadow: rgba(31, 35, 40, 0.14);
  --rawback-shadow: rgba(31, 35, 40, 0.08);
  --rawback-accent: #2da44e;
  --rawback-danger-fg: #cf222e;
}

#rawback-banner-host[data-theme="dark"] {
  --rawback-bg: rgba(13, 17, 23, 0.9);
  --rawback-fg: #e6edf3;
  --rawback-muted: #8b949e;
  --rawback-border: rgba(48, 54, 61, 0.88);
  --rawback-button-bg: #238636;
  --rawback-button-fg: #ffffff;
  --rawback-button-hover: #2ea043;
  --rawback-mark-bg: #161b22;
  --rawback-mark-border: #30363d;
  --rawback-menu-bg: #161b22;
  --rawback-menu-hover: #21262d;
  --rawback-menu-shadow: rgba(1, 4, 9, 0.4);
  --rawback-shadow: rgba(1, 4, 9, 0.32);
  --rawback-accent: #3fb950;
  --rawback-danger-fg: #ff7b72;
}

.rawback-mark {
  align-items: center;
  background: var(--rawback-mark-bg);
  border: 1px solid var(--rawback-mark-border);
  border-radius: 999px;
  box-sizing: border-box;
  color: var(--rawback-fg);
  display: inline-flex;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  height: 26px;
  justify-content: center;
  letter-spacing: 0;
  padding: 0 8px;
}

.rawback-mark-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rawback-mark-icon-wrapper svg {
  display: block;
}

.rawback-meta {
  min-width: 0;
}

.rawback-title {
  color: var(--rawback-fg);
  display: block;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rawback-path {
  color: var(--rawback-muted);
  display: block;
  font-size: 11px;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rawback-button {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
}

.rawback-open-actions {
  align-items: center;
  display: inline-flex;
}

.rawback-button {
  background: var(--rawback-button-bg);
  border-radius: 6px;
  color: var(--rawback-button-fg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  min-height: 32px;
  padding: 0 12px;
  text-decoration: none;
  white-space: nowrap;
}

.rawback-button:hover {
  background: var(--rawback-button-hover);
}

.rawback-button:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 2px;
}

.rawback-actions {
  align-items: center;
  display: flex;
  gap: 6px;
}



@media (max-width: 520px) {
  #rawback-banner-host {
    height: 50px;
  }

  .rawback-banner {
    gap: 9px;
    min-height: 50px;
    padding: 7px 8px;
  }

  .rawback-mark {
    padding-inline: 7px;
  }

  .rawback-button {
    max-width: 42vw;
    overflow: hidden;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
}
`;

// tests/banner.test.ts
var viewModel = createBannerViewModel({
  platform: "github",
  user: "octo-org",
  repo: "rawback",
  branch: "main",
  filePath: "packages/web/src/index.ts",
  repoUrl: "https://github.com/octo-org/rawback",
  fileUrl: "https://github.com/octo-org/rawback/blob/main/packages/web/src/index.ts"
}, "en");
assert.equal(viewModel.platformLabel, "GitHub");
assert.equal(viewModel.repositoryLabel, "octo-org / rawback");
assert.equal(viewModel.filePath, "packages/web/src/index.ts");
assert.equal(viewModel.primaryActionLabel, "View in repository");
assert.equal(viewModel.primaryActionUrl, "https://github.com/octo-org/rawback/blob/main/packages/web/src/index.ts");
assert.match(bannerCss, /position:\s*fixed;/);
assert.match(bannerCss, /width:\s*100vw;/);
assert.doesNotMatch(bannerCss, /max-width:\s*1080px;/);
assert.doesNotMatch(bannerCss, /:host/);
assert.match(bannerCss, /#rawback-banner-host\s*{[^}]*user-select:\s*none;/s);
assert.match(bannerCss, /#rawback-banner-host\s*{[^}]*-webkit-user-select:\s*none;/s);
assert.match(bannerCss, /\.rawback-banner,\s*\.rawback-banner \*\s*{[^}]*user-select:\s*none;/s);
var bannerSource = readFileSync("entrypoints/content/banner.ts", "utf8");
var contentSource = readFileSync("entrypoints/content/index.ts", "utf8");
var wxtConfig = readFileSync("wxt.config.ts", "utf8");
var rawCspRules = JSON.parse(readFileSync("public/rules/remove-raw-csp.json", "utf8"));
assert.match(bannerSource, /document\.createElement\('div'\)/);
assert.match(bannerSource, /host\.id = hostId/);
assert.match(bannerSource, /document\.body\.prepend\(host\)/);
assert.match(bannerSource, /host\.dataset\.mounted = 'true'/);
assert.doesNotMatch(bannerSource, /requestAnimationFrame/);
assert.match(bannerSource, /class="rawback-button primary" href="\$\{escapeAttribute\(viewModel\.primaryActionUrl\)\}"/);
assert.doesNotMatch(bannerSource, /addEventListener\('click'/);
assert.doesNotMatch(bannerSource, /addEventListener\('keydown'/);
assert.doesNotMatch(bannerSource, /closestAction/);
assert.doesNotMatch(bannerSource, /attachShadow/);
assert.doesNotMatch(bannerSource, /document\.createElement\('iframe'\)/);
assert.doesNotMatch(bannerSource, /browser\.runtime\.getURL/);
assert.doesNotMatch(bannerSource, /postMessage/);
assert.doesNotMatch(bannerSource, /<details/);
assert.doesNotMatch(bannerSource, /<summary/);
assert.doesNotMatch(bannerSource, /href="#rawback-/);
assert.doesNotMatch(bannerSource, /document\.elementFromPoint/);
assert.doesNotMatch(bannerSource, /closestActionElement/);
assert.doesNotMatch(bannerSource, /data-action="open-new-tab"/);
assert.doesNotMatch(bannerSource, /showInteractiveActions/);
assert.doesNotMatch(bannerSource, /function canUseInteractiveActions/);
assert.doesNotMatch(bannerSource, /function isSafariBrowser/);
assert.doesNotMatch(bannerSource, /closestActionButton/);
assert.match(wxtConfig, /declarativeNetRequest/);
assert.match(wxtConfig, /declarativeNetRequestWithHostAccess/);
assert.match(wxtConfig, /declarative_net_request/);
assert.match(wxtConfig, /rules\/remove-raw-csp\.json/);
assert.doesNotMatch(wxtConfig, /rawback-banner\.html/);
assert.equal(existsSync("public/rules/remove-raw-csp.json"), true);
assert.deepEqual(rawCspRules, [
  {
    id: 1,
    priority: 1,
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        {
          header: "content-security-policy",
          operation: "remove"
        }
      ]
    },
    condition: {
      urlFilter: "||raw.githubusercontent.com",
      resourceTypes: ["main_frame"]
    }
  }
]);
assert.match(contentSource, /runAt:\s*'document_start'/);
assert.match(contentSource, /matches:\s*\['<all_urls>'\]/);
assert.match(contentSource, /await waitForBody\(\)/);
assert.match(contentSource, /new MutationObserver/);
var backgroundSource = readFileSync("entrypoints/background.ts", "utf8");
assert.match(backgroundSource, /browser\.runtime\.onMessage\.addListener/);
assert.match(backgroundSource, /browser\.windows\.create/);
assert.equal(existsSync("entrypoints/background.ts"), true);
