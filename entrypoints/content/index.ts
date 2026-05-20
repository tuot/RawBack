import { parseRawUrl } from '@/utils/platforms';
import { getSettings, onSettingsChanged, type RawBackStorage } from '@/utils/storage';
import { mountBanner, removeExistingBanner, type BannerController } from './banner';

declare global {
  interface Window {
    __RAWBACK_DEBUG__?: unknown;
  }
}

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_start',
  async main() {
    let controller: BannerController | null = null;
    let renderedFileUrl: string | null = null;
    let renderedLanguage: RawBackStorage['language'] | null = null;

    const render = async (settings?: RawBackStorage) => {
      const currentSettings = settings ?? await getSettings();
      const info = parseRawUrl(location.href, {
        disabledPlatforms: currentSettings.disabledPlatforms,
        selfHostedGitlabHosts: currentSettings.selfHostedGitlabHosts,
        selfHostedGiteaHosts: currentSettings.selfHostedGiteaHosts,
      });

      const blocked =
        !currentSettings.enabled ||
        currentSettings.disabledHosts.includes(location.hostname) ||
        !info ||
        currentSettings.dismissedFiles.includes(info.fileUrl);

      const reason = getBlockReason(currentSettings, info);
      document.documentElement.dataset.rawbackLoaded = 'true';
      document.documentElement.dataset.rawbackReason = reason;
      window.__RAWBACK_DEBUG__ = {
        loaded: true,
        url: location.href,
        parsed: info,
        settings: currentSettings,
        blocked,
        reason,
      };

      if (blocked) {
        controller?.remove();
        controller = null;
        renderedFileUrl = null;
        renderedLanguage = null;
        removeExistingBanner();
        return;
      }

      if (controller && renderedFileUrl === info.fileUrl && renderedLanguage === currentSettings.language) {
        controller.update(currentSettings);
        return;
      }

      await waitForBody();
      controller?.remove();
      controller = mountBanner(info, currentSettings);
      renderedFileUrl = info.fileUrl;
      renderedLanguage = currentSettings.language;
    };

    await render();
    onSettingsChanged((settings) => void render(settings));
  },
});

function waitForBody(): Promise<void> {
  if (document.body) return Promise.resolve();

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (!document.body) return;
      observer.disconnect();
      resolve();
    });

    observer.observe(document.documentElement, { childList: true });
  });
}

function getBlockReason(settings: RawBackStorage, info: ReturnType<typeof parseRawUrl>): string {
  if (!settings.enabled) return 'disabled';
  if (settings.disabledHosts.includes(location.hostname)) return 'disabled-host';
  if (!info) return 'not-raw-url';
  if (settings.dismissedFiles.includes(info.fileUrl)) return 'dismissed-file';
  return 'visible';
}
