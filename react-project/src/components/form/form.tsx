import {
  ChangeEvent,
  Component,
  ContextType,
  FormEvent,
  ReactNode,
} from "react";
import "./form.scss";
import SearchInput from "../input/searchInput";
import SubmitBtn from "../submitBtn/submitBtn";
import { SearchContext } from "../../context/context";

interface StateTypes {
  valueInput: string;
}
class SearchForm extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  state: StateTypes = {
    valueInput: "",
  };

  handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const value = this.state.valueInput;
    const { getPokemon } = this.context;
    getPokemon(value);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ valueInput: event.target.value });
  };

  render(): ReactNode {
    return (
      <form name="search" onSubmit={this.handleClick}>
        <SearchInput
          placeholder="Input name or ID"
          onChange={this.handleChange}
        ></SearchInput>
        <SubmitBtn value="SEARCH" />
      </form>
    );
  }
}

export default SearchForm;
