import React, { useContext, useEffect, useRef, forwardRef } from "react";
import { AppContext } from "../App";

import {
  Login,
  Signup,
  CreateInterest,
  CreatePost,
  DeletePost,
  EditPost,
} from "./Forms/";
import UIMessage from "./UIMessage";

const forms = {
  login: Login,
  signup: Signup,
  null: null,
  "": null,
  createInterest: CreateInterest,
  createPost: CreatePost,
  deletePost: DeletePost,
  editPost: EditPost,
  uiMessage: UIMessage,
};
export default function Modal() {
  const ref = useRef();

  const {
    ui: { currentModal, setModal },
    loggedIn,
    stateSetters: { setUser },
    slices: { user },
  } = useContext(AppContext);

  const Form = forms[currentModal];

  useEffect(() => {
    const closeMenu = ({ target }) => {
      if (ref.current && ref.current.contains(target)) return;
      setModal("");
    };

    document.body.addEventListener("click", closeMenu);

    // cleanup function
    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, [setModal]);

  return currentModal ? (
    <div ref={ref}>
      <Form ref={ref} setModal={setModal} setUser={setUser} />
    </div>
  ) : null;
}
