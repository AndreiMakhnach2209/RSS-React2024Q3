import { ReactElement } from "react";
import "./resultsList.scss";
import { PokemonListApiResponse } from "../../types/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmptySearch from "../emptySearch/emptySearch";

interface ResultsListProps {
  data: PokemonListApiResponse;
}

function ResultsList(props: ResultsListProps): ReactElement {
  const { results } = props.data;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const listItems = results.map((item) => {
    const handleClick = (): void => {
      navigate(`/pokemon/${id}?${searchParams}`);
    };
    const { name, url } = item;
    const id = url.split("/").slice(-2, -1)[0];
    return (
      <div
        key={name + id}
        className="results-list__card"
        onClick={handleClick}
        data-testid="results-card"
      >
        <p>ID: {id}</p>
        <p>NAME: {name}</p>
      </div>
    );
  });
  return (
    <>
      {listItems.length ? (
        <div className="results-list">{listItems}</div>
      ) : (
        <EmptySearch />
      )}
    </>
  );
}

export default ResultsList;
