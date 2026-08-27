import { type RouteObject } from "react-router";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import { CHAD_ASHLEY_DEBTS } from "./debts/chad-and-ashley";
import { EXAMPLE_LOAD_DEBTS } from "./debts/example-load";
import PageDNE from "./components/PageDNE";

export default [
  { path: '/', element: <Home /> },
  { path: '/simulator', element: <Simulator key="0" /> },
  { path: '/simulator/chad-and-ashley', element: <Simulator key="1" initDebts={CHAD_ASHLEY_DEBTS} /> },
  { path: '/simulator/example-load', element: <Simulator key="2" initDebts={EXAMPLE_LOAD_DEBTS} /> },
  { path: '*', element: <PageDNE /> }
] satisfies RouteObject[];
