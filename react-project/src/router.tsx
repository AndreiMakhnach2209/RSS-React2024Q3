import { RouteObject } from "react-router-dom";
import MainPage from "./view/MainPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    children: [],
  },
];

export default routes;
