export interface IYubiKey {
  getAccounts(): Promise<string[]>;
  getTOTP(account: string): Promise<string>;
}

class FakeYubiKey implements IYubiKey {
  getAccounts(): Promise<string[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(["google", "microsoft", "amazon"]);
      }, 2 * 1000);
    });
  }

  getTOTP(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("123456");
      }, 2 * 1000);
    });
  }
};

class NativeMessagingYubiKey implements IYubiKey {
  getAccounts(): Promise<string[]> {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ type: "AccountList" }, (response) => {
        resolve(response.accounts);
      });
    });
  }

  getTOTP(account: string): Promise<string> {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ type: "Code", account }, (response) => {
        resolve(response.code);
      });
    });
  }
}

export const YubiKey: IYubiKey = import.meta.env.DEV ? new FakeYubiKey() : new NativeMessagingYubiKey();

