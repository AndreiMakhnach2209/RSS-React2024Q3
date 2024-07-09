import { Component, ContextType, ReactNode } from "react";
import "./results.scss";
import { SearchContext } from "../../context/context";

class ResultsField extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  render(): ReactNode {
    return <div className="results__container"></div>;
  }
}

export default ResultsField;
