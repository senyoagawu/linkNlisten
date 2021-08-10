import React from "react";
import styles from "./Posts.module.css";

const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.userInfo}>
        <img  className={styles.post_author_image} src={post.author.profile_pic} alt="profile_pic" />
        <div className={styles.post_author}>{post.author.first_name}</div>
      </div>
      <div className={styles.postInfo}>
        <div className={styles.body}>{post.body}</div>
      </div>
      <div className="reactions"></div>
    </div>
  );
};

export default Post;
