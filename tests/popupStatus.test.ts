import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const popupSource = readFileSync('entrypoints/popup/main.ts', 'utf8');
const popupStyles = readFileSync('entrypoints/popup/style.css', 'utf8');

const statusMarkup = '${statusText ? `<div class="status-message" role="status" aria-live="polite">';
const statusIndex = popupSource.indexOf(statusMarkup);
const firstPanelIndex = popupSource.indexOf('<section class="panel">');
const customDomainsIndex = popupSource.indexOf("${escapeHtml(t('customDomains', settings.language))}");

assert.notEqual(statusIndex, -1);
assert.ok(statusIndex > popupSource.indexOf('<section class="header">'));
assert.ok(statusIndex < firstPanelIndex);
assert.ok(customDomainsIndex > statusIndex);

assert.match(popupStyles, /\.status-message\s*{/);
assert.match(popupStyles, /\.status-message::before\s*{/);
