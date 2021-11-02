import React from "react";
// import Navbar from './Navbar'
import { useHistory } from "react-router-dom";
import styles from "./Splash.module.css";

const SplashSub = ({ setModal }) => {
  let history = useHistory();
  const onclick = (e) => {
    setModal({
      whichModal: e.target.id,
    });
  };
  return (
    <div className={styles.splash_container}>
      <div className={styles.main_left}>
        <img src="/assets/images/1.png" alt="sweetlogo" />
      </div>

      <div className={styles.main_right}>
        <p>meet pundits</p>
        <p>make friends</p>
        <p>move the nation</p>
      </div>
    </div>
  );
};

export default SplashSub;
