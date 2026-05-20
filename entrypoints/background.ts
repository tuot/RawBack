import { browser } from 'wxt/browser';
import { isOpenWindowMessage } from '@/utils/navigationMessages';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message) => {
    if (!isOpenWindowMessage(message)) return;
    void browser.windows.create({ url: message.url });
  });
});
