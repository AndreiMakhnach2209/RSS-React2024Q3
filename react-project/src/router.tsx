import { RouteObject } from "react-router-dom";
import MainPage from "./view/MainPage";
import ResultsCard from "./components/resultCard/resultCard";
import Page404 from "./view/Page404";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      { path: "/pokemon", element: null },
      {
        path: "/pokemon/:id",
        element: <ResultsCard />,
      },
    ],
  },
  {
    path: "/*",
    element: <Page404 />,
  },
];

export default routes;
