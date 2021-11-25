import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Ridebar from "../Sidebar";
import Lidebar from "../Sidebar";
import PostsContainer from "../PostsContainer";
import { getSubscriptions, getSubscribedPosts } from "../../actions/interests";
import { AppContext } from "../../App";
export default function InterestsPage({ allInterests = [] }) {
  const { interestId } = useParams();
  const {
    slices: {
      user: { email },
    },
  } = useContext(AppContext);

  const [suggestedInterests, setSuggestedInterests] = useState([]);
  const [subscribedInterests, setSubscribedInterests] = useState([]);
  const [subscribedPosts, setSuscribedPosts] = useState([]);

  useEffect(() => {
    async function fetchInterestsAndPosts() {
      const { user } = JSON.parse(localStorage.getItem("user"));
      const { subscribedInterests: subscribed, subscriptionIds } =
        await getSubscriptions(user.email || null);
      const { posts: subscribedPosts } = await getSubscribedPosts(
        user.email || null
      );
      const suggested = allInterests.filter(
        (interest) => !subscriptionIds.includes(interest.id)
      );
      const subscribedObj = {};
      subscribed.forEach((state, interest) => {
        subscribedObj[interest.id] = interest;
        return subscribedObj;
      });

      setSuggestedInterests(suggested);

      setSubscribedInterests(subscribedObj);
      setSuscribedPosts(subscribedPosts);
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

  console.log(subscribedPosts, relevantPosts(subscribedPosts));
  return (
    <div>
      <Lidebar
        heading="My Interests"
        iterables={Object.values(subscribedInterests)}
      />

      <PostsContainer posts={relevantPosts(subscribedPosts)} />

      <Ridebar suggestedInterests={suggestedInterests} />
    </div>
  );
}
