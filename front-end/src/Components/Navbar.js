import React, { useContext } from "react";
import styles from "./Splash.module.css";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App";

const Navbar = () => {
  const { setModal, loggedIn } = useContext(AppContext);
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

  return loggedIn ? (
    <div className={styles.navbar_container}>
      <div className="splash navbar_logo">
        <img
          className={styles.logo}
          src="/assets/images/2.png"
          alt="sweetlogo"
        />
      </div>
      <div>
        <div className={styles.splash_links}>
          <a
            className="splash navbar_links navbar_link_about"
            id="about"
            href="http://sdkag.github.io"
          >
            about
          </a>
          <div
            className="splash navbar_links navbar_link_login"
            id="profile"
            onClick={onclick}
          >
            profile
          </div>
          <div
            className="splash navbar_links navbar_link_login"
            id="logout"
            onClick={logout}
          >
            logout
          </div>
          <div
            className="splash navbar_links navbar_link_signup"
            id=""
            onClick={onclick}
          >
            home
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.navbar_container}>
      <div
        className="splash navbar_logo"
        onClick={() => {
          history.push("/");
        }}
      >
        <img
          className={styles.logo}
          src="/assets/images/2.png"
          alt="sweetlogo"
        />
      </div>
      <div className={styles.splash_links}>
        <a
          className="splash navbar_links navbar_link_about"
          id="about"
          href="http://sdkag.github.io"
        >
          about
        </a>
        <div
          className="splash navbar_links navbar_link_login"
          id="login"
          onClick={onclick}
        >
          login
        </div>
        <div
          className="splash navbar_links navbar_link_signup"
          id="signup"
          onClick={onclick}
        >
          signup
        </div>
      </div>
    </div>
  );
};

export default Navbar;
