import React, { useState } from "react";
import { Results } from "./Results";
import { SearchBar } from "./SearchBar";

export const Popup = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <>
      <SearchBar setSearchKey={setSearchKey}></SearchBar>
      {searchKey && <Results searchKey={searchKey}></Results>}
    </>
  );
};
