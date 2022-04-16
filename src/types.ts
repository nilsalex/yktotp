export interface TotpRequest {
  account: string;
}

export interface TotpResponse {
  account: string;
  code: string;
}
