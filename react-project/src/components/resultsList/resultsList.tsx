import { ReactElement } from "react";
import "./resultsList.scss";
import { PokemonListApiResponse } from "../../types/types";

interface ResultsListProps {
  data: PokemonListApiResponse;
}

function ResultsList(props: ResultsListProps): ReactElement {
  const { results } = props.data;
  const listItems = results.map((item) => {
    const { name, url } = item;
    const id = url.split("/").slice(-2, -1)[0];
    return (
      <div className="results-list__card" key={name + id}>
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
