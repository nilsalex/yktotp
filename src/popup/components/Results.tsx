import React, { useEffect, useState } from "react";
import { TotpRequest, isCode, isTotpResponse } from "../../types";

export interface ResultsProps {
  searchKey: string;
}

export const Results = (props: ResultsProps) => {
  const [result, setResult] = useState("");

  const handleResult = (response: unknown): void => {
    if (!isTotpResponse(response)) {
      setResult("");
    } else if (isCode(response)) {
      setResult(response.code);
    } else {
      setResult(response.error);
    }
  };

  useEffect(() => {
    setResult("Getting code ... (touch YubiKey?)");
    chrome.runtime.sendMessage(
      { type: "Code", account: props.searchKey } as TotpRequest,
      handleResult
    );
  }, [props.searchKey]);

  return <span>{result}</span>;
};
