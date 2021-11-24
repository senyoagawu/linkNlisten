import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Post from "./Post";
import styles from "./Post.module.css";
import { getSubscribedPosts } from "../../actions/interests";

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);
  const {
    slices,
    slices: {
      user: { email },
    },
  } = useContext(AppContext);
  useEffect(
    () =>
      (async () => {
        const { posts } = await getSubscribedPosts(email || null);
        setPosts(posts);
      })(),
    [email]
  );
  return (
    <div className={styles.inner_container}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;
