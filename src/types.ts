export interface TotpRequest {
  account: string;
}

export interface TotpError {
  account: string;
  error: string;
}

export interface TotpCode {
  account: string;
  code: string;
}

export type TotpResponse = TotpError | TotpCode;

export function isCode(response: TotpResponse): response is TotpCode {
  return "code" in response;
}

export function isTotpResponse(response: unknown): response is TotpResponse {
  return (
    !!response &&
    typeof response === "object" &&
    "account" in response &&
    ("code" in response || "error" in response)
  );
}
