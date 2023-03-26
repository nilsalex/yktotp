import React from "react";

export interface AccountListProps {
  accounts: Array<string>;
}

export const AccountList = (props: AccountListProps) => (
  <div>
    <ul style={{ padding: "0" }}>
      {props.accounts.map((account) => (
        <li style={{ listStyle: "none", margin: "0.5em 0" }}>{account}</li>
      ))}
    </ul>
  </div>
);
