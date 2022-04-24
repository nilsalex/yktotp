import React, { FC, useEffect, useState } from "react";
import { TotpResponse, isCode } from "../../types";

export interface ResultsProps {
  searchKey: string;
}

export const Results: FC<ResultsProps> = (props: ResultsProps) => {
  const [result, setResult] = useState("");

  const handleResult = (response: TotpResponse): void => {
    if (response == null) {
      setResult("null");
    } else if (isCode(response)) {
      setResult(response.code);
    } else {
      setResult(response.error);
    }
  };

  useEffect(() => {
    chrome.runtime.sendMessage(props.searchKey, handleResult);
  });

  return <span>{result}</span>;
};
