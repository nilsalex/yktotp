// interface for getting the account list
// (will be implemented later as a mock for development
// and as a native messaging call via a background script
// for production)
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

export const YubiKey: IYubiKey = import.meta.env.DEV ? new FakeYubiKey() : new FakeYubiKey;

