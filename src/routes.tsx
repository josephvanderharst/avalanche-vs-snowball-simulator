import { type RouteObject } from "react-router";
import App from "./pages/App";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import { DEBTS as CHAD_ASHLEY_DEBTS } from "./assets/debts-chad-and-ashley";
import { DEBTS as DEBTS_EXAMPLE_LOAD } from "./assets/debts-example-load";

export default [
  { path: '/', element: <Home /> },
  { path: '/foo', element: <App /> },
  { path: '/simulator', element: <Simulator /> },
  { path: '/simulator/chad-and-ashley', element: <Simulator initDebts={CHAD_ASHLEY_DEBTS} /> },
  { path: '/simulator/example-load', element: <Simulator initDebts={DEBTS_EXAMPLE_LOAD} /> },
] satisfies RouteObject[];
