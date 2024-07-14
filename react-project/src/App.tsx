import "./App.scss";
import SearchProvider from "./context/searchContext";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import { ReactElement } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";

function App(): ReactElement {
  const content = useRoutes(routes);
  return (
    <SearchProvider>
      <ErrorBoundary>{content}</ErrorBoundary>
    </SearchProvider>
  );
}

export default App;
