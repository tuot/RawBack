import { browser } from 'wxt/browser';
import type { Platform } from './platforms';

export type RawBackTheme = 'system' | 'light' | 'dark';
export type RawBackLanguage = 'auto' | 'en' | 'zh_CN' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'ru';

export interface RawBackStorage {
  enabled: boolean;
  theme: RawBackTheme;
  disabledHosts: string[];
  dismissedFiles: string[];
  language: RawBackLanguage;
  disabledPlatforms: Platform[];
  selfHostedGitlabHosts: string[];
  selfHostedGiteaHosts: string[];
}

export const defaultStorage: RawBackStorage = {
  enabled: true,
  theme: 'system',
  disabledHosts: [],
  dismissedFiles: [],
  language: 'auto',
  disabledPlatforms: [],
  selfHostedGitlabHosts: [],
  selfHostedGiteaHosts: [],
};

let cache: RawBackStorage | null = null;

export async function getSettings(): Promise<RawBackStorage> {
  if (cache) return cache;

  const stored = await browser.storage.sync.get(defaultStorage as unknown as Record<string, unknown>);
  cache = normalizeSettings(stored);
  return cache;
}

export async function updateSettings(patch: Partial<RawBackStorage>): Promise<RawBackStorage> {
  const next = normalizeSettings({ ...(await getSettings()), ...patch });
  await browser.storage.sync.set(next);
  cache = next;
  return next;
}

export async function dismissFilePermanently(fileUrl: string): Promise<void> {
  const settings = await getSettings();
  const dismissedFiles = [fileUrl, ...settings.dismissedFiles.filter((item) => item !== fileUrl)].slice(0, 200);
  await updateSettings({ dismissedFiles });
}

export function onSettingsChanged(callback: (settings: RawBackStorage) => void): void {
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;
    if (!Object.keys(defaultStorage).some((key) => key in changes)) return;

    cache = null;
    void getSettings().then(callback);
  });
}

function normalizeSettings(value: Record<string, unknown>): RawBackStorage {
  return {
    enabled: typeof value.enabled === 'boolean' ? value.enabled : defaultStorage.enabled,
    theme: isTheme(value.theme) ? value.theme : defaultStorage.theme,
    disabledHosts: stringArray(value.disabledHosts),
    dismissedFiles: stringArray(value.dismissedFiles).slice(0, 200),
    language: isLanguage(value.language) ? value.language : defaultStorage.language,
    disabledPlatforms: platformArray(value.disabledPlatforms),
    selfHostedGitlabHosts: stringArray(value.selfHostedGitlabHosts).map((host) => host.trim()).filter(Boolean),
    selfHostedGiteaHosts: stringArray(value.selfHostedGiteaHosts).map((host) => host.trim()).filter(Boolean),
  };
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function platformArray(value: unknown): Platform[] {
  const platforms = new Set<Platform>(['github', 'gitlab', 'gitea', 'gist']);
  return stringArray(value).filter((item): item is Platform => platforms.has(item as Platform));
}

function isTheme(value: unknown): value is RawBackTheme {
  return value === 'system' || value === 'light' || value === 'dark';
}

function isLanguage(value: unknown): value is RawBackLanguage {
  return typeof value === 'string' && ['auto', 'en', 'zh_CN', 'ja', 'ko', 'es', 'fr', 'de', 'ru'].includes(value);
}
