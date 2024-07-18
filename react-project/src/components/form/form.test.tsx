import { assert, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SearchForm from "./form";

test("should retrieve the value from local storage upon mounting", () => {
  localStorage.setItem("search_value", "Bulbasaur");
  const { getByTestId } = render(<SearchForm />);
  const input = getByTestId("pokemon-name-input") as HTMLInputElement;

  assert.equal(input.value, "Bulbasaur");
});

test("should save the entered value to local storage when clicking the Search button", () => {
  localStorage.setItem("search_value", "Bulbasaur");
  const { getByTestId } = render(<SearchForm />);

  const input = getByTestId("pokemon-name-input") as HTMLInputElement;
  const searchButton = getByTestId("search-button") as HTMLInputElement;

  fireEvent.change(input, { target: { value: "Pikachu" } });

  fireEvent.click(searchButton);

  assert.equal(localStorage.getItem("search_value"), "Pikachu");
});
