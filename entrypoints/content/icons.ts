import { browser, type PublicPath } from 'wxt/browser';
import type { Platform } from '@/utils/platforms';

const iconByPlatform = {
  github: '/assets/third-party-icons/github.svg',
  gist: '/assets/third-party-icons/github.svg',
  gitlab: '/assets/third-party-icons/gitlab.svg',
  gitea: '/assets/third-party-icons/gitea.svg',
} as const satisfies Partial<Record<Platform, PublicPath>>;

export function getPlatformIcon(platform: Platform): string {
  return getIconMarkup(platform, 'rawback-platform-icon');
}

export function getButtonIcon(platform: Platform): string {
  return getIconMarkup(platform, 'rawback-button-icon');
}

function getIconMarkup(platform: Platform, className: string): string {
  const iconPath = iconByPlatform[platform];
  if (!iconPath) return '';

  const src = browser.runtime.getURL(iconPath);
  return `<img class="${className}" src="${src}" alt="" aria-hidden="true" draggable="false" />`;
}
