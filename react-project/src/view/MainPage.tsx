import { Component, ContextType } from "react";
import "./MainPage.scss";
import SearchForm from "../components/form/form";
import ResultsField from "../components/results/results";
import Loader from "../components/loader/loader";
import { SearchContext } from "../context/context";
import EmptySearch from "../components/emptySearch/emptySearch";

class MainPage extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  render() {
    const { isLoading, isEmpty } = this.context;
    return (
      <div className="main__container">
        {isLoading && <Loader />}
        <SearchForm />
        {isEmpty ? <EmptySearch /> : <ResultsField />}
      </div>
    );
  }
}

export default MainPage;
