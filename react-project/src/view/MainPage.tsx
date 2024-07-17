import { ReactElement, useContext } from "react";
import "./MainPage.scss";
import SearchForm from "../components/form/form";
import ResultsField from "../components/results/results";
import Loader from "../components/loader/loader";
import { SearchContext } from "../context/searchContext";
import { Outlet } from "react-router-dom";

function MainPage(): ReactElement {
  const { isLoading } = useContext(SearchContext);
  return (
    <div className="main-container">
      {isLoading && <Loader />}
      <SearchForm />
      <div className="main-container__results">
        <ResultsField />
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
