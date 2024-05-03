import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { YubiKey } from "../yubikey";

export interface ResultProps {
  account: string;
}

export function Result({ account }: ResultProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [TOTP, setTOTP] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLoading(true);
    setTOTP(null);

    (async () => {
      const result = await YubiKey.getTOTP(account);
      setTOTP(result);
      setLoading(false);
      ref.current?.select();
    })();
  }, [account]);

  const value = loading ? "getting TOTP ... (touch YubiKey?)" : TOTP;
  const adornment = loading ? (
    <CircularProgress color="inherit" size={20} />
  ) : null;

  return (
    <TextField
      size="small"
      inputRef={ref}
      value={value}
      InputProps={{ endAdornment: adornment }}
    />
  );
}
