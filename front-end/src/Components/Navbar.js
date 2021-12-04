import React, { useContext } from "react";
import "./Splash.module.css";
import { NavLink } from "react-router-dom";
import "./Navbar.module.css";
import { AppContext } from "../App";
import NavbarLI from "./NavbarLi";
import { homeSvg, interestsSvg } from "../svgs";
import Dropdown from "./Dropdown";
import { loginDemo } from "../actions/auth";
import { NavBarButton } from "./Buttons";

export default function Navbar({ user }) {
  const {
    ui: { setModal },
    stateSetters: { setUser },
  } = useContext(AppContext);

  const loggedIn = user !== null;
  return (
    <>
      <nav>
        <ul>
          <span className="left">
            <NavbarLI onlyPrivate={false} onlyPublic={false}>
              {" "}
              <NavLink
                to={loggedIn ? "/" : "/splash"}
                exact={true}
                activeClassName="active"
              >
                {homeSvg}
              </NavLink>
            </NavbarLI>
            <NavbarLI onlyPrivate={true}>
              <NavLink to="/interests" exact={true} activeClassName="active">
                {interestsSvg}
              </NavLink>
            </NavbarLI>
            <Dropdown />
          </span>
        </ul>
      </nav>
    </>
  );
}
