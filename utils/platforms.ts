export type Platform = 'github' | 'gitlab' | 'gitea';

export interface RawFileInfo {
  platform: Platform;
  user: string;
  repo: string;
  branch: string;
  filePath: string;
  repoUrl: string;
  fileUrl: string;
}

export interface PlatformSettings {
  selfHostedGitlabHosts?: string[];
  selfHostedGiteaHosts?: string[];
}

const defaultGithubRawHosts = ['raw.githubusercontent.com'];
const defaultGitlabHosts = ['gitlab.com'];
const defaultGiteaHosts = ['gitea.com', 'codeberg.org'];

export const supportedPlatforms: Array<{ id: Platform; label: string; host: string }> = [
  { id: 'github', label: 'GitHub', host: 'raw.githubusercontent.com' },
  { id: 'gitlab', label: 'GitLab', host: 'gitlab.com' },
  { id: 'gitea', label: 'Gitea', host: 'gitea.com' },
];

export function parseRawUrl(rawUrl: string, settings: PlatformSettings = {}): RawFileInfo | null {
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const parsed =
    parseGithub(url) ??
    parseGitlab(url, settings) ??
    parseGitea(url, settings);

  if (!parsed) return null;
  if (settings.disabledPlatforms?.includes(parsed.platform)) return null;

  return parsed;
}

function parseGithub(url: URL): RawFileInfo | null {
  const rawHosts = new Set(defaultGithubRawHosts);
  if (!rawHosts.has(url.hostname)) return null;

  const segments = cleanSegments(url.pathname);
  if (segments.length < 4) return null;

  const [user, repo, branch, ...pathSegments] = segments;
  if (!user || !repo || !branch || pathSegments.length === 0) return null;

  const host = 'github.com';
  const filePath = pathSegments.join('/');
  const repoUrl = `${url.protocol}//${host}/${encodePath([user, repo])}`;

  return {
    platform: 'github',
    user,
    repo,
    branch,
    filePath,
    repoUrl,
    fileUrl: `${repoUrl}/blob/${encodePath([branch, filePath])}`,
  };
}

function parseGitlab(url: URL, settings: PlatformSettings): RawFileInfo | null {
  const hosts = new Set([...defaultGitlabHosts, ...(settings.selfHostedGitlabHosts ?? [])]);
  if (!hosts.has(url.hostname)) return null;

  const segments = cleanSegments(url.pathname);
  const markerIndex = findRawMarkerIndex(segments);
  if (markerIndex < 2) return null;

  const namespace = segments.slice(0, markerIndex);
  const repo = namespace.at(-1);
  const user = namespace.slice(0, -1).join('/');
  const rest = segments.slice(markerIndex + 2);
  const split = splitBranchAndPath(rest);

  if (!user || !repo || !split) return null;

  const namespacePath = encodePath(namespace);
  const repoUrl = `${url.protocol}//${url.host}/${namespacePath}`;

  return {
    platform: 'gitlab',
    user,
    repo,
    branch: split.branch,
    filePath: split.filePath,
    repoUrl,
    fileUrl: `${repoUrl}/-/blob/${encodePath([split.branch, split.filePath])}`,
  };
}

function parseGitea(url: URL, settings: PlatformSettings): RawFileInfo | null {
  const hosts = new Set([...defaultGiteaHosts, ...(settings.selfHostedGiteaHosts ?? [])]);
  if (!hosts.has(url.hostname)) return null;

  const segments = cleanSegments(url.pathname);
  if (segments.length < 5 || segments[2] !== 'raw') return null;

  const [user, repo, , refType, ...rest] = segments;
  if (!refType || rest.length === 0) return null;

  const split = splitBranchAndPath(rest);
  if (!user || !repo || !split) return null;

  const repoUrl = `${url.protocol}//${url.host}/${encodePath([user, repo])}`;

  return {
    platform: 'gitea',
    user,
    repo,
    branch: split.branch,
    filePath: split.filePath,
    repoUrl,
    fileUrl: `${repoUrl}/src/${refType}/${encodePath([split.branch, split.filePath])}`,
  };
}


function cleanSegments(pathname: string): string[] {
  return pathname.split('/').filter(Boolean).map((segment) => decodeURIComponent(segment));
}

function encodePath(segments: string[]): string {
  return segments
    .flatMap((segment) => segment.split('/'))
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function findRawMarkerIndex(segments: string[]): number {
  for (let index = 0; index < segments.length - 1; index += 1) {
    if (segments[index] === '-' && segments[index + 1] === 'raw') return index;
  }
  return -1;
}

function splitBranchAndPath(segments: string[]): { branch: string; filePath: string } | null {
  if (segments.length < 2) return null;

  const fileStart = inferFileStartIndex(segments);
  const branchSegments = segments.slice(0, fileStart);
  const pathSegments = segments.slice(fileStart);

  if (branchSegments.length === 0 || pathSegments.length === 0) return null;

  return {
    branch: branchSegments.join('/'),
    filePath: pathSegments.join('/'),
  };
}

function inferFileStartIndex(segments: string[]): number {
  const slashBranchPrefixes = new Set(['bugfix', 'chore', 'develop', 'feature', 'fix', 'hotfix', 'release']);
  if (segments.length >= 3 && slashBranchPrefixes.has(segments[0])) return 2;
  return 1;
}
