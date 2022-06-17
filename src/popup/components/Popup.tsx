import React, { useState } from "react";
import { Results } from "./Results";
import { SearchBar } from "./SearchBar";

export const Popup = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <>
      <SearchBar
        submitSearch={setSearchKey}
        clearSearch={() => setSearchKey("")}
      />
      {searchKey && <Results searchKey={searchKey} />}
    </>
  );
};
