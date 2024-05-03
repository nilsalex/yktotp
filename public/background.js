chrome.runtime.onMessage.addListener((message, sender, callback) => {
  chrome.runtime.sendNativeMessage(
    "de.nilsalex.yktotp",
    message,
    (response) => {
      callback(response);
    },
  );
  return true;
});
