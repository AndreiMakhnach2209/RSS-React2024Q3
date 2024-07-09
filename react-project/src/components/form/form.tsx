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

  componentDidMount(): void {
    const prevValue = localStorage.getItem("search_value");
    if (prevValue) {
      this.setState({ valueInput: prevValue });
      this.getData();
    }
  }

  saveSearchValue = () => {
    const { valueInput } = this.state;
    if (valueInput.trim().length)
      localStorage.setItem("search_value", valueInput);
    else localStorage.removeItem("search_value");
  };

  getData = () => {
    const value = this.state.valueInput;
    const { getPokemon } = this.context;
    getPokemon(value);
  };

  handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.getData();
    this.saveSearchValue();
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
          value={this.state.valueInput}
        ></SearchInput>
        <SubmitBtn value="SEARCH" />
      </form>
    );
  }
}

export default SearchForm;
