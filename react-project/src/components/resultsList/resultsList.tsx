import { ReactElement, useContext } from "react";
import "./resultsList.scss";
import { PokemonListApiResponse } from "../../types/types";
import { SearchContext } from "../../context/searchContext";

interface ResultsListProps {
  data: PokemonListApiResponse;
}

function ResultsList(props: ResultsListProps): ReactElement {
  const { results } = props.data;
  const { getPokemon } = useContext(SearchContext);
  const listItems = results.map((item) => {
    const { name, url } = item;
    const id = url.split("/").slice(-2, -1)[0];
    return (
      <div
        className="results-list__card"
        key={name + id}
        onClick={() => {
          getPokemon(id);
        }}
      >
        <p>ID: {id}</p>
        <p>NAME: {name}</p>
      </div>
    );
  });
  return (
    <>
      <div className="results-list">{listItems}</div>
    </>
  );
}

export default ResultsList;
