import { useEffect, useRef, useState } from "react";
import { YubiKey } from "../yubikey";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { PopperProps } from "@mui/material";

function StaticPopper(props: PopperProps) {
  const open = props.open;

  if (!open) {
    return null;
  }

  const children = props.children;

  if (!children) {
    return null;
  }

  if (typeof children === "function") {
    return <Box>{children({ placement: "auto" })}</Box>;
  }

  return <Box>{children}</Box>;
}

interface SearchProps {
  setSelectedAccount: (_: string | null) => void;
}

export function Search({ setSelectedAccount }: SearchProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    void (async () => {
      const accountListResponse = await YubiKey.getAccounts();
      if ("error" in accountListResponse) {
        setLoadingError(accountListResponse.error);
        console.log(accountListResponse);
      } else {
        setAccounts(accountListResponse.accounts);
        console.log(accountListResponse);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    ref.current?.select();
  }, [ref]);

  return (
    <Autocomplete
      size="small"
      autoComplete
      autoHighlight
      openOnFocus
      disabled={disabled}
      PopperComponent={StaticPopper}
      ListboxProps={{ sx: { maxHeight: 480 } }}
      disablePortal
      value={loadingError ?? undefined}
      loading={loading}
      onChange={(_, value) => {
        if (!!value && !loadingError) {
          setSelectedAccount(value);
          setDisabled(true);
        } else {
          setSelectedAccount(null);
        }
      }}
      options={accounts}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={ref}
          label="Account"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
