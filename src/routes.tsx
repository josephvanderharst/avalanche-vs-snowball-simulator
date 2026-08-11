import { type RouteObject } from "react-router";
import App from "./pages/App";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";

export default [
  { path: '/', element: <Home /> },
  { path: '/foo', element: <App /> },
  { path: '/simulator', element: <Simulator /> },
] satisfies RouteObject[];
