export interface YubiKeyError {
  error: string;
}

export interface AccountListResponse {
  accounts: string[];
}

export interface IYubiKey {
  getAccounts(): Promise<AccountListResponse | YubiKeyError>;
  getTOTP(account: string): Promise<string>;
}

class FakeYubiKey implements IYubiKey {
  getAccounts(): Promise<AccountListResponse | YubiKeyError> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ accounts: ["google", "microsoft", "amazon"] });
      }, 2 * 1000);
    });
  }

  getTOTP(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("123456");
      }, 2 * 1000);
    });
  }
}

class NativeMessagingYubiKey implements IYubiKey {
  getAccounts(): Promise<AccountListResponse | YubiKeyError> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "AccountList" }, (response) => {
        resolve(response as AccountListResponse | YubiKeyError);
      });
    });
  }

  getTOTP(account: string): Promise<string> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "Code", account }, (response) => {
        resolve((response as { code: string }).code);
      });
    });
  }
}

export const YubiKey: IYubiKey = Object.prototype.hasOwnProperty.call(
  window,
  "chrome",
)
  ? new NativeMessagingYubiKey()
  : new FakeYubiKey();
