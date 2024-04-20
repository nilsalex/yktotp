import { useEffect, useRef, useState } from "react";
import { YubiKey } from "../yubikey";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

export interface SearchProps {
  setSelectedAccount: (_: string | null) => void;
}

export function Search({ setSelectedAccount }: SearchProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const accountList = await YubiKey.getAccounts();
      setAccounts(accountList);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    ref?.current?.select();
  }, [ref]);

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      openOnFocus
      loading={loading}
      onChange={(_, value) => { if (!!value) { setSelectedAccount(value); } else { setSelectedAccount(null); } }}
      options={accounts}
      renderInput={(params) => <TextField {...params} inputRef={ref} label="Account" InputProps={{...params.InputProps, endAdornment: (
      <>
          {loading ? <CircularProgress color="inherit" size={20} /> : null}
          {params.InputProps.endAdornment}
        </>
      )}}/>}
    />);
}
