import {
  FormEvent,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "./form.scss";
import SearchInput from "../input/searchInput";
import SubmitBtn from "../submitBtn/submitBtn";
import { SearchContext } from "../../context/searchContext";

function SearchForm(): ReactElement {
  const { getPokemon, setSearchInput } = useContext(SearchContext);
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    const prevValue = localStorage.getItem("search_value");
    if (prevValue) {
      setValueInput(prevValue);
    }
    getPokemon(prevValue || "");
  }, [getPokemon]);

  useEffect(() => {
    setSearchInput(valueInput.trim().toLowerCase());
  }, [setSearchInput, valueInput]);

  const saveSearchValue = useCallback(() => {
    if (valueInput.trim().length) {
      localStorage.setItem("search_value", valueInput);
    } else {
      localStorage.removeItem("search_value");
    }
  }, [valueInput]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      getPokemon(valueInput);
      saveSearchValue();
    },
    [valueInput, getPokemon, saveSearchValue]
  );

  const handleChange = useCallback(
    (event: FormEvent) => {
      const { target } = event;
      if (target instanceof HTMLInputElement) setValueInput(target.value);
    },
    [setValueInput]
  );
  return (
    <>
      <form name="search" onSubmit={handleSubmit} className="search-form">
        <SearchInput
          placeholder="Input name or ID"
          onChange={handleChange}
          value={valueInput}
        />
        <SubmitBtn value="SEARCH" />
      </form>
    </>
  );
}

export default SearchForm;
