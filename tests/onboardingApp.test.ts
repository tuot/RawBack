import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const launchScreen = readFileSync('RawBack/iOS (App)/Base.lproj/LaunchScreen.storyboard', 'utf8');
const mainHtml = readFileSync('RawBack/Shared (App)/Resources/Base.lproj/Main.html', 'utf8');
const script = readFileSync('RawBack/Shared (App)/Resources/Script.js', 'utf8');
const style = readFileSync('RawBack/Shared (App)/Resources/Style.css', 'utf8');
const viewController = readFileSync('RawBack/Shared (App)/ViewController.swift', 'utf8');

assert.doesNotMatch(launchScreen, /LargeIcon/);
assert.doesNotMatch(launchScreen, /imageView/);
assert.match(launchScreen, /systemGroupedBackgroundColor/);

assert.doesNotMatch(mainHtml, /\uFFFD/);
assert.equal((mainHtml.match(/class="container"/g) ?? []).length, 1);
assert.equal((mainHtml.match(/<footer class="app-footer">/g) ?? []).length, 1);
assert.match(mainHtml, /data-i18n="app-subtitle"/);
assert.match(mainHtml, /data-i18n="step-1-title"/);
assert.match(mainHtml, /data-i18n="btn-open-settings"/);

for (const language of ['en', 'zh_CN', 'ja', 'ko', 'es', 'fr', 'de', 'ru']) {
  assert.match(script, new RegExp(`${language}: \\{`));
}

assert.match(script, /navigator\.languages/);
assert.match(script, /document\.documentElement\.lang = language\.replace\('_', '-'\)/);
assert.doesNotMatch(script, /classList\.add\('completed'\)/);
assert.match(script, /requestAnimationFrame/);
assert.doesNotMatch(style, /\.step-card\.completed/);
assert.doesNotMatch(style, /status-dot/);
assert.doesNotMatch(style, /translateY/);
assert.match(style, /body\s*\{[^}]*align-items:\s*flex-start;/s);
assert.match(style, /visibility:\s*hidden;/);
assert.match(style, /env\(safe-area-inset-top,\s*0px\)/);
assert.match(style, /env\(safe-area-inset-bottom,\s*0px\)/);

assert.match(viewController, /webView\.isOpaque = false/);
assert.match(viewController, /webView\.backgroundColor = \.systemGroupedBackground/);
assert.match(viewController, /webView\.scrollView\.contentInsetAdjustmentBehavior = \.never/);
