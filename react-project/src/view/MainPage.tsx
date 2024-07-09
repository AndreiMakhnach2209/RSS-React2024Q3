import { Component } from "react";
import "./MainPage.scss";
import SearchForm from "../components/form/form";

class MainPage extends Component {
  render() {
    return (
      <div className="main__container">
        <SearchForm />
        <div></div>
      </div>
    );
  }
}

export default MainPage;
