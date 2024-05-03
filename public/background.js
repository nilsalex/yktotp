chrome.runtime.onMessage.addListener((message, sender, callback) => {
  console.log(JSON.stringify(message));
  chrome.runtime.sendNativeMessage(
    "de.nilsalex.yktotp",
    message,
    (response) => {
      console.log(JSON.stringify(response));
      callback(response);
    },
  );
  return true;
});
