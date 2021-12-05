import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Post from "./Post";
import styles from "./Post.module.css";
import { getSubscribedPosts } from "../../actions/interests";
import CreatePost from "../Forms/CreatePost";

const PostsContainer = ({ posts }) => {
  const {
    ui: { setModal },
  } = useContext(AppContext);

  console.log("posts ====>", posts);
  return (
    <>
      <div className={styles.inner_container}>
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default PostsContainer;
