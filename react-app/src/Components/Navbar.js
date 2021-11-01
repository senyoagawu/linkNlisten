import React from "react";
import styles from "./Splash.module.css";

 const Navbar = ({ setModal }) => {
  const onclick = (e) => {
    setModal({
      whichModal: e.target.id,
    });
  };

  const logout = () => {
    localStorage.clear()
    window.location.href = '/splash'
  }

  return (
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
  );
};

export default Navbar