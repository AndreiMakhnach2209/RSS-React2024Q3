import { Component } from "react";
import "./MainPage.scss";
import SearchForm from "../components/form/form";
import ResultsField from "../components/results/results";

class MainPage extends Component {
  render() {
    return (
      <div className="main__container">
        <SearchForm />
        <ResultsField />
      </div>
    );
  }
}

export default MainPage;
