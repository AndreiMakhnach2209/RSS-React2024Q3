import { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import "./form.scss";
import SearchInput from "../input/searchInput";
import SubmitBtn from "../submitBtn/submitBtn";
import API from "../../services/api";

interface StateTypes {
  valueInput: string;
}
class SearchForm extends Component {
  state: StateTypes = {
    valueInput: "",
  };

  handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const value = this.state.valueInput;
    if (value.length) API.getInstance().getPokemon(value);
    else API.getInstance().getAllPokemons();
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
