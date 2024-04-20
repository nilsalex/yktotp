import { Stack } from "@mui/material";
import { useState } from "react";
import { Search } from "./components/Search";
import { Result } from "./components/Result";

export function App() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  return (<Stack sx={{ width: 320, gap: 1, }}>
    <Search setSelectedAccount={setSelectedAccount} />
    {!!selectedAccount && <Result account={selectedAccount} />}
  </Stack>);
}
