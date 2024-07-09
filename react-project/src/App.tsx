import { Component, ReactNode } from "react";
import "./App.scss";
import MainPage from "./view/MainPage";
import SearchProvider from "./context/context";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";

class App extends Component {
  render(): ReactNode {
    return (
      <SearchProvider>
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </SearchProvider>
    );
  }
}

export default App;
