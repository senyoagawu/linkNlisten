import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Ridebar from "../Sidebar";
import Lidebar from "../Sidebar";
import PostsContainer from "../PostsContainer";
import {
  getSubscriptions,
  getSubscribedPosts,
  getSubscription,
} from "../../actions/interests";
import styles from "./Interests.module.css";
import { AplpContext } from "../../App";
import Banner from "../Banner";
export default function InterestsPage({ allInterests = [] }) {
  const { interestId } = useParams();
  // const [suggestedInterests, setSuggestedInterests] = useState([]);
  const [subscribedInterests, setSubscribedInterests] = useState([]);
  const [allSubscribedPosts, setSuscribedPosts] = useState([]);
  const [oneSubscription, setOneSubscription] = useState(null);

  // const {
  //   slices: {
  //     user: { email },
  //   },
  // } = useContext(AppContext);
  // if (interestId) {
  // } else {
  // }
  useEffect(() => {
    async function fetchOneSubscription(id) {
      const { interest } = await getSubscription(id);
      setOneSubscription(interest);
    }

    fetchOneSubscription(interestId);
  }, [interestId]);

  useEffect(
    () => {
      async function fetchInterestsAndPosts() {
        const { user } = JSON.parse(localStorage.getItem("user"));
        const { subscribedInterests: subscribed, subscriptionIds } =
          await getSubscriptions(user.email || null);
        const { posts: allSubscribedPosts } = await getSubscribedPosts(
          user.email || null
        );
        const suggested = allInterests.filter(
          (interest) => !subscriptionIds.includes(interest.id)
        );
        const subscribedObj = {};
        subscribed.forEach(
          (interest) => (subscribedObj[interest.id] = interest)
        );

        // setSuggestedInterests(suggested);

        setSubscribedInterests(subscribedObj);
        setSuscribedPosts(allSubscribedPosts);
      }
      fetchInterestsAndPosts();
    },
    [
      // email
    ]
  );

  const relevantPosts = (posts) => {
    const relPosts = interestId ? posts[interestId] : Object.values(posts);
    if (relPosts) {
      return relPosts.length > 0 ? relPosts : null;
    } else {
      return null;
    }
  };

  return (
    <div
      className={styles.interestsPage}
      style={{
        display: "grid",
        gridTemplateColumns: "30px 220px 1fr 200px 30px",
        gridTemplateRows: "400px 1fr",
        gap: 30,
        /* border: 7px solid red; */
      }}
    >
      <div className={styles.lidebar}>
        <Lidebar
          styles={styles}
          searchbar={true}
          heading="My Interests"
          iterables={Object.values(subscribedInterests)}
        />
      </div>
      {
        <div className={styles.banner}>
          <Banner />
        </div>
      }
      <div className={styles.postsContainer}>
        <PostsContainer
          posts={oneSubscription ? oneSubscription.posts : allSubscribedPosts}
        />
      </div>

      <div className={styles.ridebar}>
        <Ridebar
          searchbar={false}
          styles={styles}
          suggestedInterests={allInterests}
        />
      </div>
    </div>
  );
}
