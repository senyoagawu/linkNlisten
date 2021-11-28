import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar";
import EditProfile from "../Forms/EditProfile";
import Interests from "../Forms/Interests";
import PostsContainer from "../PostsContainer/";
import Post from "../Forms/CreatePost";
import styles from "./Home.module.css";
import Lidebar from "../Sidebar";
import {
  getSubscribedInterests,
  getPosts,
  getIndividualPosts,
} from "../../actions/posts";
import {
  getSubscriptions,
  getSubscribedPosts,
} from "../../actions/interests.js";
import { AppContext } from "../../App";

//
const Home = ({ allInterests = [] }) => {
  const {
    slices: { posts },
    stateSetters: { setPosts },
  } = useContext(AppContext);

  // update these to ttake chats
  const [subscribedInterests, setSubscribedInterests] = useState([]);
  const [subscribedPosts, setSuscribedPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function fetchInterestsAndPosts() {
      const { user } = JSON.parse(localStorage.getItem("user"));
      const { subscribedInterests: subscribed, subscriptionIds } =
        await getSubscriptions(user.email || null);
      const { posts: subscribedPosts } = await getSubscribedPosts(
        user.email || null
      );
      const data1 = await getSubscriptions(user.email || null);
      const data2 = await getSubscribedPosts(user.email || null);
      setSubscribedInterests(subscribed);
      setSuscribedPosts(subscribedPosts);
    }
    fetchInterestsAndPosts();
  }, [refresh]);

  // const updatePosts = async () => {
  //   if (user === null) return;
  //   const { posts } = await getPosts(user.email);
  //   setPosts(posts);
  // };
  //TODO change lidebar to hangdle chats instead
  return (
    <div className={styles.homepage}>
      <Lidebar
        setRefresh={setRefresh}
        heading="Interests"
        iterables={subscribedInterests}
      />
      <div className={styles.posts_container}>
        <PostsContainer setRefresh={setRefresh} posts={subscribedPosts} />
      </div>
    </div>
  );
};

export default Home;
