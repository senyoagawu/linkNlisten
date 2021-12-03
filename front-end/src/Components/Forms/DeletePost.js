import React, { useState, useContext } from "react";
// import {NavBar} from "../Navbar";
import styles from "./Form.module.css";
// import { uploadImage } from "../../uploadImage";
import { deletePost } from "../../actions/posts";
import { AppContext, PostContext, UIContext } from "../../App";

const DeletePost = ({ setModal }) => {
  const {
    setPost,
    post: { postId, authorsId },
  } = useContext(PostContext);

  const {
    ui: { rerender },
  } = useContext(AppContext);
  const { uiMessage, setUiMessage } = useContext(UIContext);
  const closeModal = () => {
    setModal("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.user).user.id;
    // setState((state) => ({ ...state, posts }));
    // const res = await deletePost(postId, authorsId);
    const { message } = await deletePost(postId, authorsId);
    setUiMessage(message);
    setModal("uiMessage");
    setPost({});
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className={styles.form_container}>
        <form className={styles.create_post_form}>
          <h2 className={styles.form_name}>Create a Post</h2>
          <div className={styles.closeBtn} onClick={closeModal}>
            close
          </div>
          <div className={styles.field_container}>
            Are you sure you want to delete this post?
          </div>

          <button className={styles.button_create_post} onClick={handleSubmit}>
            Yes
          </button>
          <button
            className={styles.button_create_post}
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            No
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeletePost;
