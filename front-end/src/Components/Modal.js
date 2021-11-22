import React, { useContext } from "react";
import { AppContext } from "../App";
import { Login, Signup } from "./Forms/";

const forms = {
  login: Login,
  signup: Signup,
  null: null,
};
export default function Modal() {
  const {
    ui: { currentModal, setModal },
    loggedIn,
    stateSetters: { setUser },
    slices: { user },
  } = useContext(AppContext);

  const Form = forms[currentModal];

  return Form && <Form />;
}
