import { browser } from 'wxt/browser';
import type { RawFileInfo } from '@/utils/platforms';
import type { RawBackStorage } from '@/utils/storage';
import { t } from '@/utils/i18n';
import { bannerCss } from './styles/bannerStyles';
import { createBannerViewModel } from './bannerViewModel';
import { getPlatformIcon, getButtonIcon } from './icons';

const hostId = 'rawback-banner-host';

export interface BannerController {
  remove(): void;
  update(settings: RawBackStorage): void;
}

export function mountBanner(info: RawFileInfo, settings: RawBackStorage): BannerController {
  removeExistingBanner();

  const host = document.createElement('div');
  host.id = hostId;
  host.dataset.theme = resolveTheme(settings.theme);

  const style = document.createElement('style');
  style.textContent = bannerCss;

  const banner = document.createElement('div');



  const render = (currentSettings: RawBackStorage) => {
    const viewModel = createBannerViewModel(info, currentSettings.language);
    banner.className = 'rawback-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', t('bannerAriaLabel', currentSettings.language));
    
    const iconMarkup = getPlatformIcon(info.platform);
    const buttonIconMarkup = getButtonIcon(info.platform);

    banner.innerHTML = `
      <div class="rawback-mark" aria-hidden="true">
        <span class="rawback-mark-icon-wrapper">${iconMarkup}</span>
        <span class="rawback-mark-fallback" style="display:none;">${escapeHtml(viewModel.platformInitials)}</span>
      </div>
      <div class="rawback-meta">
        <span class="rawback-title">${escapeHtml(viewModel.repositoryLabel)}</span>
        <span class="rawback-path">${escapeHtml(viewModel.filePath)}</span>
      </div>
      <div class="rawback-actions">
        <div class="rawback-open-actions">
          <a class="rawback-button primary" href="${escapeAttribute(viewModel.primaryActionUrl)}" aria-label="${escapeAttribute(viewModel.primaryActionAriaLabel)}">
            ${buttonIconMarkup}
            ${escapeHtml(viewModel.primaryActionLabel)}
          </a>
        </div>
      </div>
    `;
  };

  render(settings);
  host.dataset.mounted = 'true';
  host.append(style, banner);
  document.body.prepend(host);

  const unmount = () => {
    host.remove();
  };

  return {
    remove: unmount,
    update: (nextSettings) => {
      host.dataset.theme = resolveTheme(nextSettings.theme);
      render(nextSettings);
    },
  };
}

export function removeExistingBanner(): void {
  document.getElementById(hostId)?.remove();
}

function resolveTheme(theme: RawBackStorage['theme']): 'light' | 'dark' {
  if (theme === 'light' || theme === 'dark') return theme;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
