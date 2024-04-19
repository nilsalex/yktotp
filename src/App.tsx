import { Autocomplete, CircularProgress, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

// interface for getting the account list
// (will be implemented later as a mock for development
// and as a native messaging call via a background script
// for production)
interface IYubiKey {
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

const YubiKey: IYubiKey = import.meta.env.DEV ? new FakeYubiKey() : new FakeYubiKey;

export function App() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const accountSelected = selectedAccount !== null && selectedAccount !== '';

  return (<Stack sx={{ width: 320, gap: 1, }}>
    <Search disabled={accountSelected} setSelectedAccount={setSelectedAccount} />
    {!!selectedAccount && <Result account={selectedAccount} />}
  </Stack>);
}

interface SearchProps {
  disabled: boolean;
  setSelectedAccount: (_: string | null) => void;
}

function Search(props: SearchProps) {
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
      onChange={(_, value) => { if (!!value) { props.setSelectedAccount(value); } else { props.setSelectedAccount(null); } }}
      options={accounts}
      renderInput={(params) => <TextField {...params} inputRef={ref} label="Account" InputProps={{...params.InputProps, endAdornment: (
      <>
          {loading ? <CircularProgress color="inherit" size={20} /> : null}
          {params.InputProps.endAdornment}
        </>
      )}}/>}
    />);
}

function Result(props: { account: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [TOTP, setTOTP] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLoading(true);
    setTOTP(null);

    (async () => {
      const result = await YubiKey.getTOTP(props.account);
      setTOTP(result);
      setLoading(false);
      ref.current?.select();
    })();
  }, [props.account]);

  const value = loading ? 'getting TOTP ... (touch YubiKey?)' : TOTP;
  const adornment = loading ? <CircularProgress color="inherit" size={20} /> : null;

  return <TextField inputRef={ref} value={value} InputProps={{endAdornment: adornment}}/>;
}
