// tests/navigationMessages.test.ts
import assert from "node:assert/strict";

// utils/navigationMessages.ts
var openWindowMessageType = "rawback:open-window";
function createOpenWindowMessage(url) {
  return {
    type: openWindowMessageType,
    url
  };
}
function isOpenWindowMessage(value) {
  if (!value || typeof value !== "object") return false;
  const candidate = value;
  return candidate.type === openWindowMessageType && typeof candidate.url === "string" && isHttpUrl(candidate.url);
}
function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// tests/navigationMessages.test.ts
var message = createOpenWindowMessage("https://github.com/octo-org/rawback/blob/main/README.md");
assert.deepEqual(message, {
  type: openWindowMessageType,
  url: "https://github.com/octo-org/rawback/blob/main/README.md"
});
assert.equal(isOpenWindowMessage(message), true);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType, url: "http://gitlab.com/group/repo/-/blob/main/a.ts" }), true);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType, url: "javascript:alert(1)" }), false);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType, url: "file:///etc/passwd" }), false);
assert.equal(isOpenWindowMessage({ type: openWindowMessageType }), false);
assert.equal(isOpenWindowMessage(null), false);
