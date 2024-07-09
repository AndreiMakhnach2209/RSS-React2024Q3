import { Component, ContextType, ReactNode } from "react";
import "./results.scss";
import { SearchContext } from "../../context/context";
import ResultsList from "../resultsList/resultsList";

class ResultsField extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  render(): ReactNode {
    const { data } = this.context;
    return (
      <div className="results__container">
        {data && "results" in data && <ResultsList data={data} />}
      </div>
    );
  }
}

export default ResultsField;
