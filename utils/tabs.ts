import { browser } from "wxt/browser";

export const openNewTab = async ({
  url,
  active = true,
}: {
  url: string;
  active?: boolean;
}) => {
  return await browser.tabs.create({
    url,
    active,
  });
};
