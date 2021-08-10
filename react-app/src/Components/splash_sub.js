import React from 'react'
// import Navbar from './Navbar'
import { useHistory } from 'react-router-dom';
import styles from './Splash.module.css'

const SplashSub = ({setModal}) => {
  let history = useHistory();
  const onclick = e => {
      setModal({
        whichModal: e.target.id
      })
    }
  return (
    <div className={styles.splash_container}>
      <div className={styles.navbar_container}>
        <div className="splash navbar_logo" onClick={()=> {history.push('/')}}>
          <img className={styles.logo} src="/assets/images/2.png" alt="sweetlogo" />
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

export default SplashSub