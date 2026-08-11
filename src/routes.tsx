import { type RouteObject } from "react-router";
import App from "./pages/App";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import { DEBTS } from "./assets/debts-chad-and-ashley";

export default [
  { path: '/', element: <Home /> },
  { path: '/foo', element: <App /> },
  { path: '/simulator', element: <Simulator /> },
  { path: '/simulator/chad-and-ashley', element: <Simulator initDebts={DEBTS} /> },
] satisfies RouteObject[];
