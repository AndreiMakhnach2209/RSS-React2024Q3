import { RouteObject } from "react-router-dom";
import MainPage from "./view/MainPage";
import ResultsCard from "./components/resultCard/resultCard";

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
];

export default routes;
