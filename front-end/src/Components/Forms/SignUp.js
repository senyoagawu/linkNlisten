import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signupUser } from "../../actions/auth";
import styles from "./Form.module.css";

const Signup = ({ setModal, setUser, setTokenState }) => {
  let history = useHistory();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [signupState, setSignup] = useState({
    email: "",
    first_name: "",
    password: "",
    confirmPassword: "",
  });

  const closeModal = () => {
    setModal({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const { access_token, user } = await signupUser(signupState);

    if (access_token && user) {
      localStorage.access_token = access_token;
      localStorage.user = JSON.stringify(user);
      setUser(user);
      setModal(null);
    }

    // history.push("/");
  };

  const login = (e) => {
    e.preventDefault();
    setModal("login");
  };

  const onchange = (e) => {
    e.preventDefault();
    const [field, val] = [e.target.name, e.target.value];
    setSignup({
      ...signupState,
      ...{ [field]: val },
    });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    if (e.target.id === "password") {
      setPasswordVisible(!passwordVisible);
    } else {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.signup_form}>
        <div className={styles.closeBtn} onClick={closeModal}>
          {" "}
          close{" "}
        </div>
        <div className={styles.field_container}>
          <input
            className={styles.inputs}
            type="text"
            value={signupState.email}
            placeholder="Email"
            name="email"
            onChange={onchange}
          />
        </div>
        <div className={styles.field_container}>
          <input
            className={styles.inputs}
            type="text"
            value={signupState.first_name}
            placeholder="First Name"
            name="first_name"
            onChange={onchange}
          />
        </div>
        <div className={styles.field_div}>
          <div className={styles.show_container}>
            <input
              className={styles.inputs}
              type={passwordVisible ? "text" : "password"}
              value={signupState.password}
              placeholder="Password"
              name="password"
              onChange={onchange}
            />
            <button
              className={styles.show_button}
              id="password"
              onClick={togglePassword}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className={styles.field_div}>
          <div className={styles.show_container}>
            <input
              className={styles.inputs}
              type={confirmPasswordVisible ? "text" : "password"}
              value={signupState.confirmPassword}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={onchange}
            />
            <button
              className={styles.show_button}
              id="confirmPassword"
              onClick={togglePassword}
            >
              {confirmPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Sign Up
        </button>
        <div className={styles._instead}>
          <p>
            Already have an{" "}
            <span className={styles.backto} onClick={login}>
              account
            </span>
            ?{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
