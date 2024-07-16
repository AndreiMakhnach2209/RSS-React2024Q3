import { ReactElement, useContext } from "react";
import "./MainPage.scss";
import SearchForm from "../components/form/form";
import ResultsField from "../components/results/results";
import Loader from "../components/loader/loader";
import { SearchContext } from "../context/searchContext";
import EmptySearch from "../components/emptySearch/emptySearch";
import { Outlet } from "react-router-dom";

function MainPage(): ReactElement {
  const { isLoading, isEmpty } = useContext(SearchContext);
  return (
    <div className="main__container">
      {isLoading && <Loader />}
      <SearchForm />
      {isEmpty ? <EmptySearch /> : <ResultsField />}
      <Outlet></Outlet>
    </div>
  );
}

export default MainPage;
