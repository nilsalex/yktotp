chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.runtime.sendNativeMessage(
    'de.nilsalex.yktotp',
    { account: message },
    (response) => sendResponse(response),
  );
  return true;
});
