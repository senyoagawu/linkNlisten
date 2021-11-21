import React, { useState, useContext } from "react";
import SplashSub from "../splash_sub";
// import { loginUser } from "../../utils/ajax";
import Signup from "../Forms/SignUp";
import Login from "../Forms/Login";
import { AppContext } from "../../App";

const Splash = (...props) => {
  // const [modalStates, setModal] = useState({
  //   whichModal: undefined,
  // });
  const {
    modalStates,
    setModal,
    state: { loggedIn },
  } = useContext(AppContext);

  return (
    <>
      <h1>hello from splash</h1>

      {modalStates.whichModal === "login" ? (
        <Login
          setModal={setModal}
          // setUser={setUser}
          // setTokenState={setTokenState}
        />
      ) : modalStates.whichModal === "signup" ? (
        <Signup
          setModal={setModal}
          // setUser={setUser}
          // setTokenState={setTokenState}
        />
      ) : null}
      <SplashSub setModal={setModal} />
    </>
  );
};
export default Splash;
