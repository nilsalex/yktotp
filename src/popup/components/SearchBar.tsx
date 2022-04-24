import React, { FC, useState } from "react";

export interface SearchBarProps {
  setSearchKey: (_: string) => void;
}

export const SearchBar: FC<SearchBarProps> = (props: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void =>
    setInput(e.currentTarget.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.setSearchKey(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        autoComplete={"off"}
        spellCheck={false}
        value={input}
        onChange={handleChange}
      ></input>
    </form>
  );
};
