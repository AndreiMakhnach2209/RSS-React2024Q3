import { Component, ReactNode } from "react";
import "./App.scss";
import MainPage from "./view/MainPage";
import SearchProvider from "./context/context";

class App extends Component {
  render(): ReactNode {
    return (
      <SearchProvider>
        <MainPage />
      </SearchProvider>
    );
  }
}

export default App;
