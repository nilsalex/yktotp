window.onload = () => document.getElementById('totpKey').focus();

const displayResult = (result) => {
  const node = document.getElementById('code');

  if (result.code) {
    node.innerText = result.code;

    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(node);
    selection.addRange(range);
  } else {
    node.innerText = JSON.stringify(result);
  }
};

document.getElementById('getTotp').addEventListener('submit', async (e) => {
  e.preventDefault();

  const key = e.target.elements.totpKey.value;

  document.getElementById('code').innerText = 'getting OTP ... (touch YubiKey?)';

  chrome.runtime.sendMessage(key, displayResult);
});
