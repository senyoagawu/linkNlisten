import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar";
import EditProfile from "../Forms/EditProfile";
import Interests from "../Forms/Interests";
import PostsContainer from "../PostsContainer/";
import Post from "../Forms/CreatePost";
import styles from "./Home.module.css";
import Sidebar from "../Sidebar";
import {
  getSubscribedInterests,
  getPosts,
  getIndividualPosts,
} from "../../actions/posts";
import { AppContext } from "../../App";

const Home = (props) => {
  const [currentModal, setModal] = useState({
    whichModal: undefined,
  });
  const {
    slices: { user, posts },
    stateSetters: { setPosts },
  } = useContext(AppContext);

  const updatePosts = async () => {
    if (user === null) return;
    const { posts } = await getPosts(user.email);
    setPosts(posts);
  };

  return currentModal.whichModal === "profile" ? (
    <div>
      <EditProfile setModal={setModal} />
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          {/* <Sidebar setModal={setModal} /> */}
        </div>
        <div className={styles.posts_container}>
          <PostsContainer setModal={setModal} />
        </div>
      </div>
    </div>
  ) : currentModal.whichModal === "interests" ? (
    <div>
      <Interests setModal={setModal} />
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          <Sidebar setModal={setModal} />
        </div>
        <div className={styles.posts_container}>
          <PostsContainer setModal={setModal} />
        </div>
      </div>
    </div>
  ) : currentModal.whichModal === "post" ? (
    <div>
      <Post setModal={setModal} />
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          <Sidebar setModal={setModal} />
        </div>
        <div className={styles.posts_container}>
          <PostsContainer setModal={setModal} />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          <Sidebar setModal={setModal} />
        </div>
        <div className={styles.posts_container}>
          <PostsContainer setModal={setModal} />
        </div>
      </div>
    </div>
  );
};

export default Home;
