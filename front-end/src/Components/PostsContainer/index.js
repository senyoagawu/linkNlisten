import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Post from "./Post";
import styles from "./Post.module.css";
import { getSubscribedPosts } from "../../actions/interests";

const PostsContainer = ({ posts }) => {
  const {
    slices,
    slices: {
      user: { email },
    },
  } = useContext(AppContext);

  return (
    <div className={styles.inner_container}>
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default PostsContainer;
