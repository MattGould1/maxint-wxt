import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-vue"],
  manifest: {
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
      // Optional: Set default badge properties
      // default_badge_text: "",
      // default_badge_background_color: "#4CAF50",
      // browser_style: true,
    },
  },
});
