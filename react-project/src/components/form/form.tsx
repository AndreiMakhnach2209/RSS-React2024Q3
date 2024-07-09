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
  hasError: boolean;
}

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}
class SearchForm extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  state: StateTypes = {
    valueInput: "",
    hasError: false,
  };

  componentDidMount(): void {
    const prevValue = localStorage.getItem("search_value");
    const { getPokemon } = this.context;
    if (prevValue) {
      this.setState({ valueInput: prevValue });
    }
    getPokemon(prevValue || "");
  }

  saveSearchValue = () => {
    const { valueInput } = this.state;
    if (valueInput.trim().length)
      localStorage.setItem("search_value", valueInput);
    else localStorage.removeItem("search_value");
  };

  handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const value = this.state.valueInput;
    const { getPokemon } = this.context;
    getPokemon(value);
    this.saveSearchValue();
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ valueInput: event.target.value });
  };

  throwError = () => {
    this.setState({ hasError: true });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new CustomError("Oooops!!!");
    }
    return (
      <>
        <button onClick={this.throwError}>THROW ERROR</button>
        <form name="search" onSubmit={this.handleClick} className="search-form">
          <SearchInput
            placeholder="Input name or ID"
            onChange={this.handleChange}
            value={this.state.valueInput}
          ></SearchInput>
          <SubmitBtn value="SEARCH" />
        </form>
      </>
    );
  }
}

export default SearchForm;
