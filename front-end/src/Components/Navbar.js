import React, { useContext } from "react";
// import "./Splash.module.css";
import { NavLink } from "react-router-dom";
import "./Navbar.module.css";
import { AppContext } from "../App";
import NavbarLI from "./NavbarLi";
import { homeSvg, interestsSvg } from "../svgs";
import Dropdown from "./Dropdown";
import { loginDemo } from "../actions/auth";
import { NavBarButton } from "./Buttons";
import styles from "./Navbar.module.css";

const enter = ({ setModal, demoLogin }) => (
  <>
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
      action={demoLogin}
      explanation="Click to login as Demo User"
    />
  </>
);
export default function Navbar() {
  const {
    ui: { setModal },
    slices: { user },
    stateSetters: { setUser },
  } = useContext(AppContext);

  const loggedIn = user !== null;

  const demoLogin = async () => {
    const user = await loginDemo();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <>
      <nav className={styles.navbar_container}>
        <ul>
          <span className={styles.views}>
            <NavbarLI onlyPrivate={false} onlyPublic={false}>
              {" "}
              <NavLink
                name={"homelink"}
                to={loggedIn ? "/" : "/splash"}
                exact={true}
                activeClassName="active"
              >
                <div className={styles.homeSvg}>{homeSvg}</div>
              </NavLink>
            </NavbarLI>
            <NavbarLI onlyPrivate={true} onlyPublic={false}>
              <NavLink to="/interests" exact={true} activeClassName="active">
                <div className={styles.interestsSvg}>{interestsSvg}</div>
              </NavLink>
            </NavbarLI>
          </span>
          {!loggedIn && enter({ demoLogin, setModal })}
          <span classsName={styles.dropdown}>{loggedIn && <Dropdown />}</span>
        </ul>
      </nav>
    </>
  );
}
