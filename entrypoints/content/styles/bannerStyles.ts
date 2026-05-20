export const bannerCss = `
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
  gap: 6px;
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
