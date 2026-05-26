import { defineConfig } from "wxt";

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: "RawBack",
    description: "__MSG_extensionDescription__",
    default_locale: "en",
    permissions: ["storage", "tabs"],
    host_permissions: ["<all_urls>"],
    action: {
      default_title: "RawBack",
    },
    icons: {
      "16": "icon/icon16.png",
      "32": "icon/icon32.png",
      "48": "icon/icon48.png",
      "128": "icon/icon128.png",
    },
  },
});
