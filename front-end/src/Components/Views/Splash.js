import React, { useState, useContext } from "react";
import SplashSub from "../splash_sub";
// import { postSessions } from "../../utils/ajax";
import Signup from "../Forms/SignUp";
import Login from "../Forms/Login";
import { AppContext } from "../../App";

const Splash = (...props) => {
  // const [modalStates, setModal] = useState({
  //   whichModal: undefined,
  // });
  debugger;
  const {
    modalStates,
    setModal,
    state: { loggedIn },
  } = useContext(AppContext);

  return (
    <>
      {modalStates.whichModal === "login" ? (
        <Login
          setModal={setModal}
          // setUser={setUser}
          // setTokenState={setTokenState}
        />
      ) : null}
      {modalStates.whichModal === "signup" ? (
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
