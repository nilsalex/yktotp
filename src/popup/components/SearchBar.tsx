import React, { useState } from "react";

export interface SearchBarProps {
  submitSearch: (_: string) => void;
  clearSearch: () => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value == "") {
      props.clearSearch();
    }
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.submitSearch(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        autoComplete={"off"}
        spellCheck={false}
        value={input}
        onChange={handleChange}
      />
    </form>
  );
};
