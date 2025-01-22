import { createApp } from "vue";
import FloatingUI from "./FloatingUI.vue";

export default defineContentScript({
  matches: ["*://*.netflix.com/*"],
  main() {
    // Create container with shadow DOM
    const container = document.createElement("div");
    container.id = "wxt-floating-ui";
    const shadowRoot = container.attachShadow({ mode: "open" });

    // Create mount point inside shadow DOM
    const mountPoint = document.createElement("div");
    shadowRoot.appendChild(mountPoint);

    // Add container to page
    const stepLogoContainer = document.querySelector(".stepLogoContainer");
    if (!stepLogoContainer) {
      return;
    }

    stepLogoContainer.appendChild(container);
    // stepLogoContainer
    // Create and mount Vue app
    const app = createApp(FloatingUI);
    app.mount(mountPoint);

    return () => {
      app.unmount();
      container.remove();
    };
  },
});
