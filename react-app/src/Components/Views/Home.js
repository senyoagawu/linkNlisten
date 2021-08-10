import React, { useState } from "react";
import Navbar from "../Navbar";
import EditProfile from "../Forms/EditProfile";
import Interests from "../Forms/Interests";
import PostsContainer from "../PostsContainer";
import Post from '../Forms/CreatePost'
import styles from "./Home.module.css";
import Sidebar from '../Sidebar'

const Home = (props) => {
  const [modalStates, setModal] = useState({
    whichModal: undefined,
  });
  

  return modalStates.whichModal === "profile" ? (
    <div>
      <Navbar setModal={setModal} />
      <EditProfile setModal={setModal} />
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          <Sidebar  setModal={setModal} />          
        </div>
        <div className={styles.posts_container}>
          <PostsContainer
            setModal={setModal}
          />
        </div>
      </div>
    </div>
  ) : modalStates.whichModal === "interests" ? (
    <div>
      <Navbar setModal={setModal} />
      <Interests setModal={setModal} />
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          <Sidebar  setModal={setModal} />
        </div>
        <div className={styles.posts_container}>
          <PostsContainer
            setModal={setModal}
          />
        </div>
      </div>
    </div>
  ) : modalStates.whichModal === "post" ? (
    <div>
      <Navbar setModal={setModal} />
      <Post setModal={setModal} />
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          <Sidebar  setModal={setModal} />
        </div>
        <div className={styles.posts_container}>
          <PostsContainer
            setModal={setModal}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Navbar setModal={setModal} />
      <div className={styles.homepage}>
        <div className={styles.sidebar}>
          <Sidebar  setModal={setModal} />
        </div>
        <div className={styles.posts_container}>
          <PostsContainer
            setModal={setModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
