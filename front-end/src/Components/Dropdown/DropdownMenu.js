import React, { useContext } from "react";
import { AppContext } from "../../App";
import { NavBarButton } from "../Buttons";
import { loginDemo } from "../../actions/auth";
import styles from "../Navbar.module.css";
export default function DropDownMenu() {
  const {
    slices: { user },
    ui: { setModal },
    stateSetters: { setUser },
  } = useContext(AppContext);

  const loggedIn = user !== null;
  // const loggedIn = loggedIn;

  return (
    <span className={styles.dropdown}>
      <ul>
        <NavBarButton
          onlyPrivate={true}
          text="profile page"
          explanation="click to go to profile page"
          action={() => setModal("userSettings")}
        />
        <NavBarButton
          onlyPrivate={true}
          text="manage subscriptions"
          explanation="click to manage interests you want to follow"
          action={() => setModal("userSettings")}
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
      </ul>
    </span>
  );
}
