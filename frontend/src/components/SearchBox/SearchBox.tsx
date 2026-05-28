import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (searchWord: string) => void;
}

const FORBIDDEN_CHARS_REGEX = /[^a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ\s.,!?()''""--]/g;

export default function SearchBox({ onChange }: SearchBoxProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value;

    const cleanedValue = rawValue.replace(FORBIDDEN_CHARS_REGEX, "");
    event.target.value = cleanedValue;

    onChange(cleanedValue);
  }

  return (
    <input
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search tasks..."
    />
  );
}
