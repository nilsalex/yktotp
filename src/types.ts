export interface TotpRequest {
  account: string;
}

export interface TotpError extends TotpRequest {
  error: string;
}

export interface TotpCode extends TotpRequest {
  code: string;
}

export type TotpResponse = TotpError | TotpCode;

export function isCode(response: TotpResponse): response is TotpCode {
  return "code" in response;
}
