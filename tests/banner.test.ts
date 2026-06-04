import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createBannerViewModel } from '../entrypoints/content/bannerViewModel';
import { bannerCss } from '../entrypoints/content/styles/bannerStyles';

const viewModel = createBannerViewModel({
  platform: 'github',
  user: 'octo-org',
  repo: 'rawback',
  branch: 'main',
  filePath: 'packages/web/src/index.ts',
  repoUrl: 'https://github.com/octo-org/rawback',
  fileUrl: 'https://github.com/octo-org/rawback/blob/main/packages/web/src/index.ts',
}, 'en');

assert.equal(viewModel.platformLabel, 'GitHub');
assert.equal(viewModel.repositoryLabel, 'octo-org / rawback');
assert.equal(viewModel.filePath, 'packages/web/src/index.ts');
assert.equal(viewModel.primaryActionLabel, 'View in repository');
assert.equal(viewModel.primaryActionUrl, 'https://github.com/octo-org/rawback/blob/main/packages/web/src/index.ts');

assert.match(bannerCss, /position:\s*fixed;/);
assert.match(bannerCss, /width:\s*100vw;/);
assert.doesNotMatch(bannerCss, /max-width:\s*1080px;/);

assert.doesNotMatch(bannerCss, /:host/);
assert.match(bannerCss, /#rawback-banner-host\s*{[^}]*user-select:\s*none;/s);
assert.match(bannerCss, /#rawback-banner-host\s*{[^}]*-webkit-user-select:\s*none;/s);
assert.match(bannerCss, /\.rawback-banner,\s*\.rawback-banner \*\s*{[^}]*user-select:\s*none;/s);



const bannerSource = readFileSync('entrypoints/content/banner.ts', 'utf8');
const contentSource = readFileSync('entrypoints/content/index.ts', 'utf8');
const wxtConfig = readFileSync('wxt.config.ts', 'utf8');

assert.match(bannerSource, /document\.createElement\('div'\)/);
assert.match(bannerSource, /host\.id = hostId/);
assert.match(bannerSource, /document\.body\.prepend\(host\)/);
assert.match(bannerSource, /host\.dataset\.mounted = 'true'/);
assert.doesNotMatch(bannerSource, /requestAnimationFrame/);
assert.match(bannerSource, /class="rawback-button primary" href="\$\{escapeAttribute\(viewModel\.primaryActionUrl\)\}"/);



// No DOM event listeners on banner elements (sandbox-safe)
assert.doesNotMatch(bannerSource, /addEventListener\('click'/);
assert.doesNotMatch(bannerSource, /addEventListener\('keydown'/);
assert.doesNotMatch(bannerSource, /closestAction/);

assert.doesNotMatch(bannerSource, /attachShadow/);
assert.doesNotMatch(bannerSource, /document\.createElement\('iframe'\)/);
assert.doesNotMatch(bannerSource, /browser\.runtime\.getURL/);
assert.doesNotMatch(bannerSource, /postMessage/);
assert.doesNotMatch(bannerSource, /<details/);
assert.doesNotMatch(bannerSource, /<summary/);
assert.doesNotMatch(bannerSource, /href="#rawback-/);
assert.doesNotMatch(bannerSource, /document\.elementFromPoint/);
assert.doesNotMatch(bannerSource, /closestActionElement/);
assert.doesNotMatch(bannerSource, /data-action="open-new-tab"/);
assert.doesNotMatch(bannerSource, /showInteractiveActions/);
assert.doesNotMatch(bannerSource, /function canUseInteractiveActions/);
assert.doesNotMatch(bannerSource, /function isSafariBrowser/);
assert.doesNotMatch(bannerSource, /closestActionButton/);

assert.doesNotMatch(wxtConfig, /rawback-banner\.html/);
assert.match(contentSource, /runAt:\s*'document_start'/);
assert.match(contentSource, /matches:\s*\['<all_urls>'\]/);
assert.match(contentSource, /await waitForBody\(\)/);
assert.match(contentSource, /new MutationObserver/);

const backgroundSource = readFileSync('entrypoints/background.ts', 'utf8');
assert.match(backgroundSource, /browser\.runtime\.onMessage\.addListener/);
assert.match(backgroundSource, /browser\.windows\.create/);
assert.equal(existsSync('entrypoints/background.ts'), true);
