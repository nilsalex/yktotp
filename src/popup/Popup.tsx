import React from "react";
import { FC } from "react";
import { isCode, TotpResponse } from "../types";

export const Popup: FC = () => <div>{"Hello, world!"}</div>;

window.onload = () => document.getElementById("totpKey")?.focus();

const displayResult = (result: TotpResponse) => {
  const node = document.getElementById("code");

  if (node == null) {
    return;
  }

  if (result == null) {
    node.innerText = "null";
    return;
  }

  if (isCode(result)) {
    node.innerText = result.code;

    const selection = window.getSelection();
    const range = document.createRange();

    selection?.removeAllRanges();
    range.selectNodeContents(node);
    selection?.addRange(range);
  } else {
    node.innerText = result.error;
  }
};

interface TotpFormElements extends HTMLFormControlsCollection {
  totpKey: HTMLInputElement;
}

document.getElementById("getTotp")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const key = ((e.target as HTMLFormElement).elements as TotpFormElements)
    .totpKey.value;

  const displayElement = document.getElementById("code");

  if (displayElement == null) {
    return;
  }

  displayElement.innerText = "getting OTP ... (touch YubiKey?)";

  chrome.runtime.sendMessage(key, displayResult);
});
