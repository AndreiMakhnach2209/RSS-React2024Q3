import { ReactElement } from "react";
import "./resultsList.scss";
import { PokemonListApiResponse } from "../../types/types";
import { NavLink } from "react-router-dom";

interface ResultsListProps {
  data: PokemonListApiResponse;
}

function ResultsList(props: ResultsListProps): ReactElement {
  const { results } = props.data;
  const listItems = results.map((item) => {
    const { name, url } = item;
    const id = url.split("/").slice(-2, -1)[0];
    return (
      <NavLink to={`pokemon/${id}`} key={name + id}>
        <div className="results-list__card">
          <p>ID: {id}</p>
          <p>NAME: {name}</p>
        </div>
      </NavLink>
    );
  });
  return (
    <>
      <div className="results-list">{listItems}</div>
    </>
  );
}

export default ResultsList;
