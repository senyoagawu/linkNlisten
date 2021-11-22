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
  LoginButton,
  SignupButton,
  DemoLoginButton,
  LogoutButton,
} from "./Buttons";

export default function Navbar() {
  const {
    modalStates,
    setModal,
    loggedIn,
    stateSetters: { setUser },
  } = useContext(AppContext);
  // const modalMap = {
  //   login: <Login setModal={setModal} />,
  //   signup: <Signup setModal={setModal} />,
  //   "": null,
  // };

  const onclick = (e) => {
    setModal({
      whichModal: e.target.id,
    });
  };
  let history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/splash";
  };
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
            <NavbarLI onlyPublic={true}>
              <LoginButton
                onClick={() => {
                  debugger;
                  setModal("login");
                }}
              />
            </NavbarLI>
            <NavbarLI onlyPublic={true}>
              <SignupButton onClick={() => setModal("signup")} />
            </NavbarLI>
            <NavbarLI onlyPublic={true}>
              <button
                onClick={async () => {
                  const user = await loginDemo();
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", user.token);
                  setUser(user);
                }}
              >
                Demo Login
              </button>
              {/* <DemoLoginButton onClick={(){/> */}
            </NavbarLI>
            <NavbarLI onlyPrivate={true}>
              <button
                onClick={async () => {
                  debugger;
                  localStorage.clear();
                  setUser(null);
                }}
              >
                logout
              </button>
              <LogoutButton />
            </NavbarLI>
          </span>
        </ul>
      </nav>
    </>
  );
}
