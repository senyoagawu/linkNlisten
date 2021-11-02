import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postSessions } from "../../utils/ajax";
import styles from "./Form.module.css";

const Login = ({ setModal }) => {
  let history = useHistory();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginState, setLogin] = useState({
    email: "",
    password: "",
  });

  const closeModal = () => {
    setModal({});
  };

  const handleSubmit = async (e, payload = undefined) => {
    const userCreds = payload || loginState;
    debugger
    e.preventDefault();
    const {
      access_token,
      user,
    } = await postSessions(userCreds);

    if (access_token && user) {
      localStorage.access_token = access_token;
      // setTokenState(access_token);
      localStorage.user = JSON.stringify(user);
      // setUser(user);
     
      // history.push("/");
      window.location.href = '/'
    }
    // console.log('before the push')
    // debugger
    // console.log('after the push')    
  };

  const loginDemoUser = (e) => {
    e.preventDefault();
    const [password, email] = ["password", "demo@gmail.com"];
    handleSubmit(e, { password, email });
    // history.push('/')
  };

  const onchange = (e) => {
    e.preventDefault();
    const [field, val] = [e.target.name, e.target.value];
    setLogin({
      ...loginState,
      ...{ [field]: val },
    });
  };

  const signUp = (e) => {
    e.preventDefault();

    setModal({ whichModal: "signup" });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.login_form}>
        <div className={styles.closeBtn} onClick={closeModal}>
          {" "}
          close{" "}
        </div>
        <div className={styles.field_container}>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Email"
            value={loginState.email}
            name="email"
            onChange={onchange}
          />
        </div>
        <div className={styles.field_div}>
          <div className={styles.show_container}>
            <input
              className={styles.inputs}
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={loginState.password}
              name="password"
              onChange={onchange}
            />
            <button className={styles.show_button} onClick={togglePassword}>
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className={styles.field_div}>
          <button className={styles.button_login} onClick={handleSubmit}>
            {" "}
            Log In
          </button>
          <button className={styles.button_demo} onClick={loginDemoUser}>
            {" "}
            Demo User
          </button>
        </div>
        <div className={styles._instead}>
          <p>
            Don't have an{" "}
            <span className={styles.backto} onClick={signUp}>
              account
            </span>
            ?{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;