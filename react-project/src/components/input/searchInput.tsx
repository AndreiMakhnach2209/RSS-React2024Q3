import { Component, InputHTMLAttributes, ReactNode } from "react";
import "./searchInput.scss";

class SearchInput extends Component<InputHTMLAttributes<HTMLInputElement>> {
  render(): ReactNode {
    const { placeholder, ...restProps } = this.props;
    return (
      <input
        placeholder={placeholder}
        name="identifier"
        autoComplete="false"
        {...restProps}
      />
    );
  }
}

export default SearchInput;
