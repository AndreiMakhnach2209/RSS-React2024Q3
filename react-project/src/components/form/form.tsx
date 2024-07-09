import { Component, ReactNode } from "react";
import "./form.scss";
import SearchInput from "../input/searchInput";
import SubmitBtn from "../submitBtn/submitBtn";

class SearchForm extends Component {
  render(): ReactNode {
    return (
      <form name="search">
        <SearchInput placeholder="Input name or ID"></SearchInput>
        <SubmitBtn value="SEARCH" />
      </form>
    );
  }
}

export default SearchForm;
