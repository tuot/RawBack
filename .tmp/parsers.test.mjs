// tests/parsers.test.ts
import assert from "node:assert/strict";

// utils/platforms.ts
var defaultGithubRawHosts = ["raw.githubusercontent.com"];
var defaultGitlabHosts = ["gitlab.com"];
var defaultGiteaHosts = ["gitea.com", "codeberg.org"];
function parseRawUrl(rawUrl, settings = {}) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  const parsed = parseGithub(url) ?? parseGitlab(url, settings) ?? parseGitea(url, settings);
  if (!parsed) return null;
  if (settings.disabledPlatforms?.includes(parsed.platform)) return null;
  return parsed;
}
function parseGithub(url) {
  const rawHosts = new Set(defaultGithubRawHosts);
  if (!rawHosts.has(url.hostname)) return null;
  const segments = cleanSegments(url.pathname);
  if (segments.length < 4) return null;
  const [user, repo, branch, ...pathSegments] = segments;
  if (!user || !repo || !branch || pathSegments.length === 0) return null;
  const host = "github.com";
  const filePath = pathSegments.join("/");
  const repoUrl = `${url.protocol}//${host}/${encodePath([user, repo])}`;
  return {
    platform: "github",
    user,
    repo,
    branch,
    filePath,
    repoUrl,
    fileUrl: `${repoUrl}/blob/${encodePath([branch, filePath])}`
  };
}
function parseGitlab(url, settings) {
  const hosts = /* @__PURE__ */ new Set([...defaultGitlabHosts, ...settings.selfHostedGitlabHosts ?? []]);
  if (!hosts.has(url.hostname)) return null;
  const segments = cleanSegments(url.pathname);
  const markerIndex = findRawMarkerIndex(segments);
  if (markerIndex < 2) return null;
  const namespace = segments.slice(0, markerIndex);
  const repo = namespace.at(-1);
  const user = namespace.slice(0, -1).join("/");
  const rest = segments.slice(markerIndex + 2);
  const split = splitBranchAndPath(rest);
  if (!user || !repo || !split) return null;
  const namespacePath = encodePath(namespace);
  const repoUrl = `${url.protocol}//${url.host}/${namespacePath}`;
  return {
    platform: "gitlab",
    user,
    repo,
    branch: split.branch,
    filePath: split.filePath,
    repoUrl,
    fileUrl: `${repoUrl}/-/blob/${encodePath([split.branch, split.filePath])}`
  };
}
function parseGitea(url, settings) {
  const hosts = /* @__PURE__ */ new Set([...defaultGiteaHosts, ...settings.selfHostedGiteaHosts ?? []]);
  if (!hosts.has(url.hostname)) return null;
  const segments = cleanSegments(url.pathname);
  if (segments.length < 5 || segments[2] !== "raw") return null;
  const [user, repo, , refType, ...rest] = segments;
  if (!refType || rest.length === 0) return null;
  const split = splitBranchAndPath(rest);
  if (!user || !repo || !split) return null;
  const repoUrl = `${url.protocol}//${url.host}/${encodePath([user, repo])}`;
  return {
    platform: "gitea",
    user,
    repo,
    branch: split.branch,
    filePath: split.filePath,
    repoUrl,
    fileUrl: `${repoUrl}/src/${refType}/${encodePath([split.branch, split.filePath])}`
  };
}
function cleanSegments(pathname) {
  return pathname.split("/").filter(Boolean).map((segment) => decodeURIComponent(segment));
}
function encodePath(segments) {
  return segments.flatMap((segment) => segment.split("/")).map((segment) => encodeURIComponent(segment)).join("/");
}
function findRawMarkerIndex(segments) {
  for (let index = 0; index < segments.length - 1; index += 1) {
    if (segments[index] === "-" && segments[index + 1] === "raw") return index;
  }
  return -1;
}
function splitBranchAndPath(segments) {
  if (segments.length < 2) return null;
  const fileStart = inferFileStartIndex(segments);
  const branchSegments = segments.slice(0, fileStart);
  const pathSegments = segments.slice(fileStart);
  if (branchSegments.length === 0 || pathSegments.length === 0) return null;
  return {
    branch: branchSegments.join("/"),
    filePath: pathSegments.join("/")
  };
}
function inferFileStartIndex(segments) {
  const slashBranchPrefixes = /* @__PURE__ */ new Set(["bugfix", "chore", "develop", "feature", "fix", "hotfix", "release"]);
  if (segments.length >= 3 && slashBranchPrefixes.has(segments[0])) return 2;
  return 1;
}

// tests/parsers.test.ts
var github = parseRawUrl("https://raw.githubusercontent.com/octo-org/rawback/main/src/index.ts");
assert.deepEqual(github, {
  platform: "github",
  user: "octo-org",
  repo: "rawback",
  branch: "main",
  filePath: "src/index.ts",
  repoUrl: "https://github.com/octo-org/rawback",
  fileUrl: "https://github.com/octo-org/rawback/blob/main/src/index.ts"
});
var gitlab = parseRawUrl("https://gitlab.com/group/subgroup/rawback/-/raw/release/v1/packages/app/index.ts");
assert.deepEqual(gitlab, {
  platform: "gitlab",
  user: "group/subgroup",
  repo: "rawback",
  branch: "release/v1",
  filePath: "packages/app/index.ts",
  repoUrl: "https://gitlab.com/group/subgroup/rawback",
  fileUrl: "https://gitlab.com/group/subgroup/rawback/-/blob/release/v1/packages/app/index.ts"
});
var gitea = parseRawUrl("https://codeberg.org/forgejo/forgejo/raw/branch/forgejo/README.md");
assert.deepEqual(gitea, {
  platform: "gitea",
  user: "forgejo",
  repo: "forgejo",
  branch: "forgejo",
  filePath: "README.md",
  repoUrl: "https://codeberg.org/forgejo/forgejo",
  fileUrl: "https://codeberg.org/forgejo/forgejo/src/branch/forgejo/README.md"
});
var customGitlab = parseRawUrl(
  "https://git.company.com/group/repo/-/raw/main/doc.md",
  { selfHostedGitlabHosts: ["git.company.com"] }
);
assert.equal(customGitlab?.fileUrl, "https://git.company.com/group/repo/-/blob/main/doc.md");
var customGitea = parseRawUrl(
  "https://git.mygitea.com/user/repo/raw/branch/main/index.ts",
  { selfHostedGiteaHosts: ["git.mygitea.com"] }
);
assert.equal(customGitea?.fileUrl, "https://git.mygitea.com/user/repo/src/branch/main/index.ts");
assert.equal(parseRawUrl("https://example.com/not/raw"), null);
