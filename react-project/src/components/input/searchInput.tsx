import { InputHTMLAttributes, ReactElement } from "react";
import "./searchInput.scss";

function SearchInput({
  placeholder,
  ...restProps
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return (
    <input
      placeholder={placeholder}
      name="identifier"
      autoComplete="false"
      {...restProps}
    />
  );
}

export default SearchInput;
