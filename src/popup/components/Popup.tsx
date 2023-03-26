import React, { useEffect, useState } from "react";
import { Results } from "./Results";
import { SearchBar } from "./SearchBar";
import { AccountList } from "./AccountList";
import {
  AccountListRequest,
  isAccountList,
  isAccountListResponse,
} from "../../types";

export const Popup = () => {
  const [searchKey, setSearchKey] = useState("");
  const [accounts, setAccounts] = useState<Array<string>>([]);

  const handleAccountListResponse = (response: unknown) => {
    if (!isAccountListResponse(response)) {
      setAccounts([]);
    } else if (isAccountList(response)) {
      setAccounts(response.accounts);
    } else {
      setAccounts([]);
    }
  };

  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: "AccountList" } as AccountListRequest,
      handleAccountListResponse
    );
  }, []);

  const filteredAccounts = accounts.filter((account: string) =>
    account.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <>
      <SearchBar setSearchKey={setSearchKey} />
      <AccountList accounts={filteredAccounts} />
      {filteredAccounts.length == 1 && (
        <Results searchKey={filteredAccounts[0]} />
      )}
    </>
  );
};
