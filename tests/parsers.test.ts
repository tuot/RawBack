import assert from 'node:assert/strict';
import { parseRawUrl } from '../utils/platforms';

const github = parseRawUrl('https://raw.githubusercontent.com/octo-org/rawback/main/src/index.ts');
assert.deepEqual(github, {
  platform: 'github',
  user: 'octo-org',
  repo: 'rawback',
  branch: 'main',
  filePath: 'src/index.ts',
  repoUrl: 'https://github.com/octo-org/rawback',
  fileUrl: 'https://github.com/octo-org/rawback/blob/main/src/index.ts',
});

const gitlab = parseRawUrl('https://gitlab.com/group/subgroup/rawback/-/raw/release/v1/packages/app/index.ts');
assert.deepEqual(gitlab, {
  platform: 'gitlab',
  user: 'group/subgroup',
  repo: 'rawback',
  branch: 'release/v1',
  filePath: 'packages/app/index.ts',
  repoUrl: 'https://gitlab.com/group/subgroup/rawback',
  fileUrl: 'https://gitlab.com/group/subgroup/rawback/-/blob/release/v1/packages/app/index.ts',
});



const gitea = parseRawUrl('https://codeberg.org/forgejo/forgejo/raw/branch/forgejo/README.md');
assert.deepEqual(gitea, {
  platform: 'gitea',
  user: 'forgejo',
  repo: 'forgejo',
  branch: 'forgejo',
  filePath: 'README.md',
  repoUrl: 'https://codeberg.org/forgejo/forgejo',
  fileUrl: 'https://codeberg.org/forgejo/forgejo/src/branch/forgejo/README.md',
});

const customGitlab = parseRawUrl(
  'https://git.company.com/group/repo/-/raw/main/doc.md',
  { selfHostedGitlabHosts: ['git.company.com'] }
);
assert.equal(customGitlab?.fileUrl, 'https://git.company.com/group/repo/-/blob/main/doc.md');

const customGitea = parseRawUrl(
  'https://git.mygitea.com/user/repo/raw/branch/main/index.ts',
  { selfHostedGiteaHosts: ['git.mygitea.com'] }
);
assert.equal(customGitea?.fileUrl, 'https://git.mygitea.com/user/repo/src/branch/main/index.ts');

assert.equal(parseRawUrl('https://example.com/not/raw'), null);
