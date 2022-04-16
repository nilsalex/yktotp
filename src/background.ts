import { TotpRequest } from "./types";

chrome.runtime.onMessage.addListener(
  (message: TotpRequest, sender, callback) => {
    chrome.runtime.sendNativeMessage(
      "de.nilsalex.yktotp",
      { account: message },
      (response) => callback(response)
    );
    return true;
  }
);
