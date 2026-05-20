import './style.css';
import { browser } from 'wxt/browser';
import { parseRawUrl, supportedPlatforms, type Platform } from '@/utils/platforms';
import { getSettings, updateSettings, dismissFilePermanently, type RawBackStorage } from '@/utils/storage';
import { t } from '@/utils/i18n';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Popup root is missing');
const app = root;

let settings = await getSettings();
let activeUrl = await getActiveTabUrl();

render();

function render(statusText = ''): void {
  const info = activeUrl
    ? parseRawUrl(activeUrl, {
        disabledPlatforms: settings.disabledPlatforms,
        selfHostedGitlabHosts: settings.selfHostedGitlabHosts,
        selfHostedGiteaHosts: settings.selfHostedGiteaHosts,
      })
    : null;

  app.innerHTML = `
    <section class="header">
      <div>
        <h1>RawBack</h1>
        <p>${settings.enabled ? escapeHtml(t('enabled', settings.language)) : escapeHtml(t('disabled', settings.language))}</p>
      </div>
      <label class="switch">
        <input id="enabled" type="checkbox" ${settings.enabled ? 'checked' : ''} />
        <span></span>
      </label>
    </section>

    <section class="panel">
      <h2>${escapeHtml(t('currentPage', settings.language))}</h2>
      ${info ? rawPageHtml(info) : `<p class="muted">${escapeHtml(t('notRawPage', settings.language))}</p>`}
    </section>

    <section class="panel">
      <h2>${escapeHtml(t('appearance', settings.language))}</h2>
      <label class="field">
        <span>${escapeHtml(t('theme', settings.language))}</span>
        <select id="theme">
          ${option('system', t('themeSystem', settings.language), settings.theme)}
          ${option('light', t('themeLight', settings.language), settings.theme)}
          ${option('dark', t('themeDark', settings.language), settings.theme)}
        </select>
      </label>
      <label class="field">
        <span>${escapeHtml(t('language', settings.language))}</span>
        <select id="language">
          ${option('auto', t('languageAuto', settings.language), settings.language)}
          ${option('zh_CN', t('languageChinese', settings.language), settings.language)}
          ${option('en', t('languageEnglish', settings.language), settings.language)}
          ${option('ja', t('languageJapanese', settings.language), settings.language)}
          ${option('ko', t('languageKorean', settings.language), settings.language)}
          ${option('es', t('languageSpanish', settings.language), settings.language)}
          ${option('fr', t('languageFrench', settings.language), settings.language)}
          ${option('de', t('languageGerman', settings.language), settings.language)}
          ${option('ru', t('languageRussian', settings.language), settings.language)}
        </select>
      </label>
    </section>

    <section class="panel">
      <h2>${escapeHtml(t('platforms', settings.language))}</h2>
      <div class="platforms">
        ${supportedPlatforms.map((platform) => platformToggle(platform.id, platform.label)).join('')}
      </div>
    </section>

    <section class="panel">
      <h2>${escapeHtml(t('hiddenFiles', settings.language))}</h2>
      ${hiddenFilesHtml()}
    </section>

    <section class="panel">
      <h2>${escapeHtml(t('customDomains', settings.language))}</h2>
      <div class="hidden-files" style="margin-bottom: 8px;">
        ${settings.selfHostedGitlabHosts.map(host => customDomainHtml(host, 'GitLab')).join('')}
        ${settings.selfHostedGiteaHosts.map(host => customDomainHtml(host, 'Gitea')).join('')}
      </div>
      <div style="display: flex; gap: 8px;">
        <select id="new-domain-platform" style="flex: 0 0 auto; min-height: 34px;">
          <option value="gitlab">GitLab</option>
          <option value="gitea">Gitea</option>
        </select>
        <input type="text" id="new-domain-input" placeholder="${escapeAttribute(t('customDomainsHint', settings.language))}" style="flex: 1; min-width: 0; padding: 4px 8px; border: 1px solid #bcccdc; border-radius: 6px; font-size: 13px;" autocomplete="off" spellcheck="false" />
        <button id="add-domain-btn" type="button">${escapeHtml(t('add', settings.language))}</button>
      </div>
      ${statusText ? `<p class="saved">${escapeHtml(statusText)}</p>` : ''}
    </section>
  `;

  bindEvents();
}

function bindEvents(): void {
  app.querySelector<HTMLInputElement>('#enabled')?.addEventListener('change', async (event) => {
    settings = await updateSettings({ enabled: (event.currentTarget as HTMLInputElement).checked });
    render();
  });

  app.querySelector<HTMLSelectElement>('#theme')?.addEventListener('change', async (event) => {
    settings = await updateSettings({ theme: (event.currentTarget as HTMLSelectElement).value as RawBackStorage['theme'] });
    render();
  });

  app.querySelector<HTMLSelectElement>('#language')?.addEventListener('change', async (event) => {
    settings = await updateSettings({ language: (event.currentTarget as HTMLSelectElement).value as RawBackStorage['language'] });
    render();
  });

  app.querySelectorAll<HTMLInputElement>('input[data-platform]').forEach((input) => {
    input.addEventListener('change', async () => {
      const disabledPlatforms = supportedPlatforms
        .map((platform) => platform.id)
        .filter((platform) => !app.querySelector<HTMLInputElement>(`input[data-platform="${platform}"]`)?.checked);
      settings = await updateSettings({ disabledPlatforms });
      render();
    });
  });

  app.querySelector<HTMLButtonElement>('#add-domain-btn')?.addEventListener('click', async () => {
    const platform = app.querySelector<HTMLSelectElement>('#new-domain-platform')?.value;
    const input = app.querySelector<HTMLInputElement>('#new-domain-input')?.value ?? '';
    const host = parseHost(input);
    if (!host) return;

    if (platform === 'gitlab' && !settings.selfHostedGitlabHosts.includes(host)) {
      settings = await updateSettings({ selfHostedGitlabHosts: [...settings.selfHostedGitlabHosts, host] });
    } else if (platform === 'gitea' && !settings.selfHostedGiteaHosts.includes(host)) {
      settings = await updateSettings({ selfHostedGiteaHosts: [...settings.selfHostedGiteaHosts, host] });
    }
    render(t('settingsSaved', settings.language));
  });

  app.querySelectorAll<HTMLButtonElement>('button[data-delete-gitlab]').forEach((button) => {
    button.addEventListener('click', async () => {
      const host = button.dataset.deleteGitlab;
      if (!host) return;
      settings = await updateSettings({
        selfHostedGitlabHosts: settings.selfHostedGitlabHosts.filter((item) => item !== host),
      });
      render();
    });
  });

  app.querySelectorAll<HTMLButtonElement>('button[data-delete-gitea]').forEach((button) => {
    button.addEventListener('click', async () => {
      const host = button.dataset.deleteGitea;
      if (!host) return;
      settings = await updateSettings({
        selfHostedGiteaHosts: settings.selfHostedGiteaHosts.filter((item) => item !== host),
      });
      render();
    });
  });

  app.querySelectorAll<HTMLButtonElement>('button[data-restore-file]').forEach((button) => {
    button.addEventListener('click', async () => {
      const fileUrl = button.dataset.restoreFile;
      if (!fileUrl) return;

      settings = await updateSettings({
        dismissedFiles: settings.dismissedFiles.filter((item) => item !== fileUrl),
      });
      render(t('restored', settings.language));
    });
  });

  app.querySelector<HTMLButtonElement>('button[data-open-repo]')?.addEventListener('click', async (event) => {
    const url = (event.currentTarget as HTMLButtonElement).dataset.openRepo;
    if (!url) return;
    await browser.tabs.create({ url });
    window.close();
  });
  app.querySelector<HTMLButtonElement>('button[data-dismiss-file]')?.addEventListener('click', async (event) => {
    const fileUrl = (event.currentTarget as HTMLButtonElement).dataset.dismissFile;
    if (!fileUrl) return;

    await dismissFilePermanently(fileUrl);
    settings = await getSettings();
    render(t('settingsSaved', settings.language));
  });
}

function rawPageHtml(info: NonNullable<ReturnType<typeof parseRawUrl>>): string {
  const isDismissed = settings.dismissedFiles.includes(info.fileUrl);
  return `
    <div class="repo">
      <strong>${escapeHtml(info.user)} / ${escapeHtml(info.repo)}</strong>
      <span>${escapeHtml(info.filePath)}</span>
    </div>
    <div class="page-actions">
      <button class="primary" type="button" data-open-repo="${escapeAttribute(info.fileUrl)}">${escapeHtml(t('openRepository', settings.language))}</button>
      ${!isDismissed ? `<button class="ghost danger-text" type="button" data-dismiss-file="${escapeAttribute(info.fileUrl)}">${escapeHtml(t('dismissThisFile', settings.language))}</button>` : ''}
    </div>
  `;
}

function platformToggle(platform: Platform, label: string): string {
  const checked = !settings.disabledPlatforms.includes(platform);
  return `
    <label class="platform">
      <span>${escapeHtml(label)}</span>
      <input type="checkbox" data-platform="${platform}" ${checked ? 'checked' : ''} />
    </label>
  `;
}

function hiddenFilesHtml(): string {
  if (settings.dismissedFiles.length === 0) {
    return `<p class="muted">${escapeHtml(t('hiddenFilesEmpty', settings.language))}</p>`;
  }

  return `
    <div class="hidden-files">
      ${settings.dismissedFiles.map((fileUrl) => `
        <div class="hidden-file">
          <span title="${escapeAttribute(fileUrl)}">${escapeHtml(shortenUrl(fileUrl))}</span>
          <button type="button" class="ghost" data-restore-file="${escapeAttribute(fileUrl)}">${escapeHtml(t('restore', settings.language))}</button>
        </div>
      `).join('')}
    </div>
  `;
}

function customDomainHtml(host: string, platformLabel: string): string {
  const datasetKey = platformLabel === 'GitLab' ? 'data-delete-gitlab' : 'data-delete-gitea';
  return `
    <div class="hidden-file">
      <span title="${escapeAttribute(host)}">${escapeHtml(host)} <span style="opacity: 0.5; font-size: 11px">(${platformLabel})</span></span>
      <button type="button" class="ghost" style="padding: 2px 6px; min-height: 24px; font-size: 12px" ${datasetKey}="${escapeAttribute(host)}">✕</button>
    </div>
  `;
}

function parseHost(input: string): string {
  const val = input.trim();
  if (!val) return '';
  try {
    const url = new URL(val.includes('://') ? val : `https://${val}`);
    return url.hostname;
  } catch {
    return val;
  }
}

function shortenUrl(fileUrl: string): string {
  try {
    const url = new URL(fileUrl);
    return `${url.hostname}${url.pathname}`;
  } catch {
    return fileUrl;
  }
}

function option(value: string, label: string, current: string): string {
  return `<option value="${escapeAttribute(value)}" ${value === current ? 'selected' : ''}>${escapeHtml(label)}</option>`;
}

async function getActiveTabUrl(): Promise<string | null> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  return tab?.url ?? null;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
