import { type RouteObject } from "react-router";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import { CHAD_ASHLEY_DEBTS } from "./debts/chad-and-ashley";
import { EXAMPLE_LOAD_DEBTS } from "./debts/example-load";

export default [
  { path: '/', element: <Home /> },
  { path: '/simulator', element: <Simulator /> },
  { path: '/simulator/chad-and-ashley', element: <Simulator initDebts={CHAD_ASHLEY_DEBTS} /> },
  { path: '/simulator/example-load', element: <Simulator initDebts={EXAMPLE_LOAD_DEBTS} /> },
] satisfies RouteObject[];
