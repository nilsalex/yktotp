import React, { FC, useState } from "react";
import { Results } from "./Results";
import { SearchBar } from "./SearchBar";

export const Popup: FC = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <>
      <SearchBar setSearchKey={setSearchKey}></SearchBar>
      {searchKey && <Results searchKey={searchKey}></Results>}
    </>
  );
};
