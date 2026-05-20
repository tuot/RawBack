import assert from 'node:assert/strict';
import { createOpenWindowMessage, isOpenWindowMessage, openWindowMessageType } from '../utils/navigationMessages';

const message = createOpenWindowMessage('https://github.com/octo-org/rawback/blob/main/README.md');

assert.deepEqual(message, {
  type: openWindowMessageType,
  url: 'https://github.com/octo-org/rawback/blob/main/README.md',
});
assert.equal(isOpenWindowMessage(message), true);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType, url: 'http://gitlab.com/group/repo/-/blob/main/a.ts' }), true);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType, url: 'javascript:alert(1)' }), false);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType, url: 'file:///etc/passwd' }), false);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType }), false);
assert.equal(isOpenWindowMessage(null), false);
