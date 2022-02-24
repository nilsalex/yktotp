window.onload = () => document.getElementById('totpKey').focus();

const displayResult = (result) => {
  document.getElementById('code').innerText = result.code ?? JSON.stringify(result);
};

document.getElementById('getTotp').addEventListener('submit', async (e) => {
  e.preventDefault();

  const key = e.target.elements.totpKey.value;

  document.getElementById('code').innerText = 'getting OTP ... (touch Yubikey?)';

  chrome.runtime.sendMessage(key, displayResult);
});
