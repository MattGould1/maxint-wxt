import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "Maxint",
    description: "A small but powerful wxt to help you manage your budget.",
    permissions: ["storage", "tabs"],
    host_permissions: ["*://*.netflix.com/*"],
    web_accessible_resources: [
      {
        resources: ["**/*"],
        matches: ["<all_urls>"],
      },
    ],
    content_scripts: [
      {
        matches: ["*://*.netflix.com/*"],
        js: ["/content-scripts/content.js"],
      },
    ],
    action: {
      default_popup: "entrypoints/popup/index.html",
    },
  },
});
