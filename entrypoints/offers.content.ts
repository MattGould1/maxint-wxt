import { createApp } from "vue";
import UI from "./offers/ui.vue";

export default defineContentScript({
  matches: ["*://*.bankofamerica.com/*"],
  main() {
    // Create container with shadow DOM
    const container = document.createElement("div");
    container.id = "wxt-floating-ui";
    const shadowRoot = container.attachShadow({ mode: "open" });

    // Create mount point inside shadow DOM
    const mountPoint = document.createElement("div");
    shadowRoot.appendChild(mountPoint);

    // Add container to page
    const tableContainer = document.getElementById(
      "ratesRewardsSavingsDepositsModule"
    );
    if (!tableContainer) {
      return;
    }

    tableContainer.appendChild(container);

    // Create and mount Vue app
    const app = createApp(UI);
    app.mount(mountPoint);

    return () => {
      app.unmount();
      container.remove();
    };
  },
});
