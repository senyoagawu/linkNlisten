import React, { useContext } from "react";
import { AppContext } from "../App";
import {
  Login,
  Signup,
  CreateInterest,
  CreatePost,
  DeletePost,
  EditPost,
} from "./Forms/";

const forms = {
  login: Login,
  signup: Signup,
  null: null,
  "": null,
  createInterest: CreateInterest,
  createPost: CreatePost,
  deletePost: DeletePost,
  editPost: EditPost,
};
export default function Modal() {
  const {
    ui: { currentModal, setModal },
    loggedIn,
    stateSetters: { setUser },
    slices: { user },
  } = useContext(AppContext);

  const Form = forms[currentModal];

  return currentModal ? <Form setModal={setModal} setUser={setUser} /> : null;
}
