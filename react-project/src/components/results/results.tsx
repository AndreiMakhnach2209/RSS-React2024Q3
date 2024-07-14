import { ReactElement, useContext } from "react";
import "./results.scss";
import { SearchContext } from "../../context/searchContext";
import ResultsList from "../resultsList/resultsList";
import ResultsCard from "../resultCard/resultCard";
import { isPokemon, isPokemonListApiResponse } from "../../types/guards";
import PaginationBox from "../pagination/pagination";

function ResultsField(): ReactElement {
  const { data } = useContext(SearchContext);

  return (
    <div className="results__container">
      {isPokemonListApiResponse(data) && (
        <>
          <PaginationBox />
          <ResultsList data={data} />
        </>
      )}
      {isPokemon(data) && <ResultsCard data={data} />}
    </div>
  );
}

export default ResultsField;
