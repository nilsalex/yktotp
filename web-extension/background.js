chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const nativeMessage = {
        request: message.type,
        account: message.type === "getOtp" ? message.key : ""
    };

    chrome.runtime.sendNativeMessage(
        'de.nilsalex.yktotp',
        nativeMessage,
        sendResponse,
    );

    return true;
});
