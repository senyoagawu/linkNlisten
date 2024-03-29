import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginDemo, loginUser } from "../../actions/auth";
import styles from "./Form.module.css";

const Login = ({ setModal, setUser }) => {
  let history = useHistory();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginState, setLogin] = useState({
    email: "",
    password: "",
  });

  const closeModal = () => {
    setModal({});
  };

  const handleSubmit = async (e, payload) => {
    const userCreds = payload || loginState;
    e.preventDefault();
    const { access_token, user } = await loginUser(userCreds);

    if (access_token && user) {
      localStorage.access_token = access_token;
      localStorage.user = JSON.stringify(user);
      setModal(null);
      setUser(user);
      // history.push("/");
    }
  };

  const loginDemoUser = async (e) => {
    e.preventDefault();
    const { access_token, user } = await loginDemo();
    handleSubmit(e, { password: "password", email: "demo@gmail.com" });
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

    setModal("signup");
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
