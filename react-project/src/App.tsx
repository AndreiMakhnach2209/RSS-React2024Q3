import "./App.scss";
import MainPage from "./view/MainPage";
import SearchProvider from "./context/searchContext";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import { ReactElement } from "react";

function App(): ReactElement {
  return (
    <SearchProvider>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </SearchProvider>
  );
}

export default App;
