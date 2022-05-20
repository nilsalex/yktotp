import type { TotpRequest } from "../types";
import MessageSender = chrome.runtime.MessageSender;
import onMessage = chrome.runtime.onMessage;

onMessage.addListener(
  (
    message: TotpRequest,
    sender: MessageSender,
    callback: (response: unknown) => void
  ) => {
    chrome.runtime.sendNativeMessage(
      "de.nilsalex.yktotp",
      { account: message },
      callback
    );
    return true;
  }
);
