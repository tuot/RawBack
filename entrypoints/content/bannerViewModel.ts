import type { RawFileInfo } from '@/utils/platforms';
import type { RawBackLanguage } from '@/utils/storage';
import { t } from '@/utils/i18n';

export interface BannerViewModel {
  platformInitials: string;
  platformLabel: string;
  repositoryLabel: string;
  filePath: string;
  primaryActionLabel: string;
  primaryActionAriaLabel: string;
  primaryActionUrl: string;
  repositoryOrigin: string;
}

export function createBannerViewModel(info: RawFileInfo, language: RawBackLanguage): BannerViewModel {
  const isGist = info.platform === 'gist';
  return {
    platformInitials: platformMark(info.platform),
    platformLabel: platformName(info.platform),
    repositoryLabel: `${info.user} / ${info.repo}`,
    filePath: info.filePath,
    primaryActionLabel: isGist ? t('openInGist', language) : t('openInRepository', language),
    primaryActionAriaLabel: isGist ? t('openGistFileAriaLabel', language) : t('openRepositoryFileAriaLabel', language),
    primaryActionUrl: info.fileUrl,
    repositoryOrigin: getOrigin(info.fileUrl),
  };
}

function getOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return '';
  }
}

function platformName(platform: RawFileInfo['platform']): string {
  if (platform === 'github') return 'GitHub';
  if (platform === 'gitlab') return 'GitLab';
  if (platform === 'gitea') return 'Gitea';
  if (platform === 'gist') return 'GitHub Gist';
  return '';
}

function platformMark(platform: RawFileInfo['platform']): string {
  if (platform === 'github') return 'GH';
  if (platform === 'gitlab') return 'GL';
  if (platform === 'gitea') return 'GT';
  if (platform === 'gist') return 'GH';
  return '';
}
