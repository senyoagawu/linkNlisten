import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Ridebar from "../Sidebar";
import Lidebar from "../Sidebar";
import PostsContainer from "../PostsContainer";
import { getSubscriptions, getSubscribedPosts } from "../../actions/interests";
import { AppContext } from "../../App";
import Banner from "../Banner";
export default function InterestsPage({ allInterests = [] }) {
  const { interestId } = useParams();
  const [suggestedInterests, setSuggestedInterests] = useState([]);
  const [subscribedInterests, setSubscribedInterests] = useState([]);
  const [allSubscribedPosts, setSuscribedPosts] = useState([]);

  const {
    slices: {
      user: { email },
    },
  } = useContext(AppContext);
  // if (interestId) {
  // } else {
  // }

  useEffect(() => {
    async function fetchInterestsAndPosts() {
      const { user } = JSON.parse(localStorage.getItem("user"));
      const { subscribedInterests: subscribed, subscriptionIds } =
        await getSubscriptions(user.email || null);
      const { posts: allSubscribedPosts } = await getSubscribedPosts(
        user.email || null
      );
      debugger;
      const suggested = allInterests.filter(
        (interest) => !subscriptionIds.includes(interest.id)
      );
      const subscribedObj = {};
      subscribed.forEach((interest) => (subscribedObj[interest.id] = interest));

      setSuggestedInterests(suggested);

      setSubscribedInterests(subscribedObj);
      setSuscribedPosts(allSubscribedPosts);
    }
    fetchInterestsAndPosts();
  }, [email]);

  const relevantPosts = (posts) => {
    const relPosts = interestId ? posts[interestId] : Object.values(posts);
    if (relPosts) {
      return relPosts.length > 0 ? relPosts : null;
    } else {
      return null;
    }
  };

  console.log(allSubscribedPosts, relevantPosts(allSubscribedPosts));
  return (
    <div className="interestsPage">
      <div className="lidebar interestPage">
        <Lidebar
          heading="My Interests"
          iterables={Object.values(subscribedInterests)}
        />
      </div>
      <div className="interestsPage banner">
        <Banner />
      </div>
      <div className="postsContainer  interestsPage">
        <PostsContainer posts={relevantPosts(allSubscribedPosts)} />
      </div>

      <div className="interstsPage ridebar">
        <Ridebar suggestedInterests={suggestedInterests} />
      </div>
    </div>
  );
}
