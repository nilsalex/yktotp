export interface TotpRequest {
  type: "Code";
  account: string;
}

export interface AccountListRequest {
  type: "AccountList";
}

export interface Error {
  error: string;
}

export interface TotpCode {
  code: string;
}

export interface AccountList {
  accounts: Array<string>;
}

export type TotpResponse = Error | TotpCode;
export type AccountListResponse = Error | AccountList;

export function isCode(response: TotpResponse): response is TotpCode {
  return "code" in response;
}

export function isTotpResponse(response: unknown): response is TotpResponse {
  return (
    !!response &&
    typeof response === "object" &&
    ("code" in response || "error" in response)
  );
}

export function isAccountList(
  response: AccountListResponse
): response is AccountList {
  return "accounts" in response;
}

export function isAccountListResponse(
  response: unknown
): response is AccountListResponse {
  return (
    !!response &&
    typeof response == "object" &&
    ("accounts" in response || "error" in response)
  );
}
