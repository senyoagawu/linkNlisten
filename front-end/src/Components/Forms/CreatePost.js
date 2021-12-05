import React, { useState, useContext, forwardRef } from "react";
// import {NavBar} from "../Navbar";
import styles from "./Form.module.css";
// import { uploadImage } from "../../uploadImage";
import { createPost } from "../../actions/posts";
import { AppContext } from "../../App";

const CreatePost = forwardRef((props, ref) => {
  const {
    ui: { setModal },
    setRefresh,
  } = useContext(AppContext);

  const [message, setMessage] = useState("");

  const closeModal = () => {
    setModal("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authorsId = JSON.parse(localStorage.user).user.id;
    const { post } = await createPost({ authorsId, message });
    //todo do we need this data
    // setPosts(prev => [...prev, post])
    closeModal();
    setRefresh((prev) => !prev);
  };

  const onchange = ({ target: { value } }) => {
    setMessage(value);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div ref={ref} className={styles.form_container}>
        <form className={styles.create_post_form}>
          <h2 className={styles.form_name}>Create a Post</h2>
          <div className={styles.closeBtn} onClick={closeModal}>
            close
          </div>
          <div className={styles.field_container}>
            <input
              className={styles.inputs}
              type="text"
              value={message}
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
});

export default CreatePost;
