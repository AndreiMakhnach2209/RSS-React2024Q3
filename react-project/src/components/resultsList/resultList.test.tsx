import { render, screen } from "@testing-library/react";
import ResultsList from "./resultsList";
import { expect, test } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

test("The component displays the specified number of cards", () => {
  const results = Array(Math.trunc(Math.random() * 20)).fill({
    name: "name",
    url: "url",
  });
  const mockData = {
    count: 0,
    next: null,
    previous: null,
    results,
  };
  render(<ResultsList data={mockData} />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });

  const cards = screen.getAllByTestId("results-card");
  expect(cards).toHaveLength(mockData.results.length);
});

test("A message is displayed if there are no cards", () => {
  const mockData = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  render(<ResultsList data={mockData} />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });

  const emptyMessage = screen.getByTestId("not-found-cards");
  expect(emptyMessage).toBeInTheDocument();
});
