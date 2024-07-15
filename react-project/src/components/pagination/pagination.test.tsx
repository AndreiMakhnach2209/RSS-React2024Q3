import { render, fireEvent } from "@testing-library/react";
import PaginationBox from "./pagination";
import { SearchContext } from "../../context/searchContext";
import { expect, test, vi } from "vitest";

test("should update URL query parameter when clicking Next button", () => {
  const mockGetPage = vi.fn();
  const mockGetPokemon = async (): Promise<void> => {};
  const mockSetSearchInput = (): void => {};
  const mockSearch = (): void => {};

  const mockContext = {
    data: {
      count: 0,
      next: "nextPage",
      previous: null,
      results: [],
    },
    isLoading: false,
    isEmpty: false,
    searchInput: "",
    count: 0,
    fullList: [],
    limit: 20,
    offset: 0,
    getPokemon: mockGetPokemon,
    setSearchInput: mockSetSearchInput,
    getPage: mockGetPage,
    search: mockSearch,
  };
  const { getByTestId } = render(<PaginationBox />, {
    wrapper: ({ children }) => (
      <SearchContext.Provider value={mockContext}>
        {children}
      </SearchContext.Provider>
    ),
  });

  const nextButton = getByTestId("Next_page_btn");

  fireEvent.click(nextButton);

  expect(mockGetPage).toHaveBeenCalled();
});
