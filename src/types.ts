export interface TotpRequest {
  type: "Code";
  account: string;
}

export interface TotpError {
  error: string;
}

export interface TotpCode {
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
    ("code" in response || "error" in response)
  );
}
