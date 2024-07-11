import { ReactElement, useContext } from "react";
import "./results.scss";
import { SearchContext } from "../../context/searchContext";
import ResultsList from "../resultsList/resultsList";
import ResultsCard from "../resultCard/resultCard";

function ResultsField(): ReactElement {
  const { data } = useContext(SearchContext);

  return (
    <div className="results__container">
      {data && "results" in data && <ResultsList data={data} />}
      {data && "id" in data && <ResultsCard data={data} />}
    </div>
  );
}

export default ResultsField;
