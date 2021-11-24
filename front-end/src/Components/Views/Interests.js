import React, { useEffect, useState, useContext } from "react";
import Ridebar from "../Sidebar";
import Lidebar from "../Sidebar";
import PostsContainer from "../PostsContainer";
import { getSubscriptions, getSubscribedPosts } from "../../actions/interests";
import { AppContext } from "../../App";
export default function InterestsPage({ allInterests = [] }) {
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
      const { subscribed, subscriptionIds } = await getSubscriptions(
        email || null
      );
      const { subscribedPosts } = await getSubscribedPosts(email || null);
      const suggested = allInterests.filter(
        (interest) => !subscriptionIds.includes(interest.id)
      );
      setSuggestedInterests(suggested);
      setSubscribedInterests(subscribed);
      setSuscribedPosts(subscribedPosts);
    }
    fetchInterestsAndPosts();
  }, [email]);
  return (
    <div>
      <Lidebar header="My Interests" interests={subscribedInterests} />
      <PostsContainer posts={subscribedPosts} />
      <Ridebar suggestedInterests={suggestedInterests} />
    </div>
  );
}
