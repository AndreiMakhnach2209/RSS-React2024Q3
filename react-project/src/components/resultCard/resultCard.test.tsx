import { expect, test, vi } from "vitest";
import ResultsCard from "./resultCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import { Pokemon } from "../../types/types";

const mockContext = {
  data: null,
  isLoading: false,
  isEmpty: false,
  searchInput: "",
  count: 0,
  fullList: [],
  details: {
    id: 1,
    name: "string",
    base_experience: 1,
    height: 1,
    is_default: true,
    order: 1,
    weight: 1,
    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: "string",
    moves: [],
    past_types: [],
    sprites: {},
    cries: {},
    species: "string",
    stats: [],
    types: [],
  } as unknown as Pokemon,
  getPokemon: vi.fn(),
  setSearchInput: vi.fn(),
  getPage: vi.fn(),
  search: vi.fn(),
};

test("should render that the card component the relevant card data", () => {
  render(<ResultsCard />, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <SearchContext.Provider value={mockContext}>
          {children}
        </SearchContext.Provider>
      </MemoryRouter>
    ),
  });

  const name = screen.getByTestId("results-card-name");
  const image = screen.getByTestId("results-card-image");
  const description = screen.getByTestId("results-card-desc");

  expect(name).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});
