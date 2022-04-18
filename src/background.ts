import type { TotpRequest, TotpResponse } from "./types";
import MessageSender = chrome.runtime.MessageSender;
import onMessage = chrome.runtime.onMessage;

onMessage.addListener(
  (
    message: TotpRequest,
    sender: MessageSender,
    callback: (response: TotpResponse) => void
  ) => {
    chrome.runtime.sendNativeMessage(
      "de.nilsalex.yktotp",
      { account: message },
      callback
    );
    return true;
  }
);
