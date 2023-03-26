import React from "react";

export interface SearchBarProps {
  setSearchKey: (_: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    props.setSearchKey(e.currentTarget.value);
  };

  return (
    <input
      autoFocus
      autoComplete={"off"}
      spellCheck={false}
      onChange={handleChange}
    />
  );
};
