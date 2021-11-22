import React, { useContext } from "react";
import "./Splash.module.css";
import { useHistory, NavLink } from "react-router-dom";
import "./Navbar.module.css";
import { AppContext } from "../App";
import NavbarLI from "./NavbarLi";
import { homeSvg, interestsSvg } from "../svgs";
import { ProtectedRoute } from "../utils/routes";
import { loginDemo, logoutUser, loginUser, signupUser } from "../actions/auth";
import {
  Button,
  NavBarButton,
  LoginButton,
  SignupButton,
  DemoLoginButton,
  LogoutButton,
} from "./Buttons";

export default function Navbar() {
  const {
    ui: { setModal },
    loggedIn,
    stateSetters: { setUser },
    slices: { user },
  } = useContext(AppContext);
  // const modalMap = {
  //   login: <Login setModal={setModal} />,
  //   signup: <Signup setModal={setModal} />,
  //   "": null,
  // };

  return (
    <>
      <nav>
        <ul>
          <span className="left">
            <NavbarLI onlyPrivate={false} onlyPublic={false}>
              <NavLink
                to={loggedIn ? "/" : "/splash"}
                exact={true}
                activeClassName="active"
              >
                {homeSvg}
              </NavLink>
            </NavbarLI>
          </span>
          <span className="right">
            <NavbarLI onlyPrivate={true}>
              <NavLink to="/interests" exact={true} activeClassName="active">
                Interests
              </NavLink>
            </NavbarLI>

            <NavBarButton
              onlyPublic={true}
              text="Login"
              explanation="Click to login"
              action={() => setModal("login")}
            />
            <NavBarButton
              onlyPublic={true}
              text="Signup"
              explanation="Click to create account"
              action={() => setModal("signup")}
            />
            <NavBarButton
              onlyPublic={true}
              text="Demo Login"
              action={async () => {
                const user = await loginDemo();
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
              }}
              explanation="Click to login as Demo User"
            />
            <NavBarButton
              onlyPrivate={true}
              text="Logout"
              explanation="Click to logout"
              action={async () => {
                localStorage.clear();
                setUser(null);
              }}
            />
          </span>
        </ul>
      </nav>
    </>
  );
}
