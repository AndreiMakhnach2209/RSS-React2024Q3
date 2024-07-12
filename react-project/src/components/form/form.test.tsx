import { assert, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SearchForm from "./form";

localStorage.setItem("search_value", "Bulbasaur");
const { getByPlaceholderText, getByText } = render(<SearchForm />);

test("should retrieve the value from local storage upon mounting", () => {
  const input = getByPlaceholderText("Input name or ID") as HTMLInputElement;

  assert.equal(input.value, "Bulbasaur");
});

test("should save the entered value to local storage when clicking the Search button", () => {
  const input = getByPlaceholderText("Input name or ID") as HTMLInputElement;
  const searchButton = getByText("SEARCH") as HTMLInputElement;

  fireEvent.change(input, { target: { value: "Pikachu" } });

  fireEvent.click(searchButton);

  assert.equal(localStorage.getItem("search_value"), "Pikachu");
});
