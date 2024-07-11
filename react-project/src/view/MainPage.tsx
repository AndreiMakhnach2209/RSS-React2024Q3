import { ReactElement, useContext } from "react";
import "./MainPage.scss";
import SearchForm from "../components/form/form";
import ResultsField from "../components/results/results";
import Loader from "../components/loader/loader";
import { SearchContext } from "../context/searchContext";
import EmptySearch from "../components/emptySearch/emptySearch";

function MainPage(): ReactElement {
  const { isLoading, isEmpty } = useContext(SearchContext);
  return (
    <div className="main__container">
      {isLoading && <Loader />}
      <SearchForm />
      {isEmpty ? <EmptySearch /> : <ResultsField />}
    </div>
  );
}

export default MainPage;
