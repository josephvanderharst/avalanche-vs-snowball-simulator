import { Link } from "react-router";
import "./Navbar.css";

export type NavbarProps = {
  navbarHeight: string;
};

export default function Navbar({ navbarHeight }: NavbarProps) {
  return (
    <>
      <nav className="navbar" style={{ height: navbarHeight }}>
        <Link reloadDocument to="#/">Home</Link>
        <Link reloadDocument to="#/about">About</Link>
        <Link reloadDocument to="#/simulator">Simulator</Link>
        <Link reloadDocument to="#/simulator/chad-and-ashley">Chad &amp; Ashley</Link>
        <Link reloadDocument to="#/simulator/example-load">Example Load</Link>
      </nav>
    </>
  )
}
