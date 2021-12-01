import React, { useState, useContext, useEffect } from "react";
// import {NavBar} from "../Navbar";
import styles from "./Form.module.css";
// import { uploadImage } from "../../uploadImage";
import { editPost, getPost } from "../../actions/posts";
import { AppContext } from "../../App";

const Post = ({ setModal }) => {
  const { setState } = useContext(AppContext);
  const [message, setMessage] = useState({ message: "" });
  const closeModal = () => {
    setModal({});
  };

  useEffect(() => {
    async function getPost() {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = { email: JSON.parse(localStorage.user).email };
    const { posts } = await createPost({ ...email, ...message });
    setState((state) => ({ ...state, posts }));
    closeModal();
  };

  const onchange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setMessage({
      message: val,
    });
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
            <input
              className={styles.inputs}
              type="text"
              value={message.message}
              placeholder="Message"
              name="message"
              onChange={onchange}
            />
          </div>

          <button className={styles.button_create_post} onClick={handleSubmit}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
