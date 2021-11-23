import React, { useEffect, useState, useContext } from "react";
import Ridebar from "../Sidebar";
import Lidebar from "../Sidebar";
import PostsContainer from "../PostsContainer";
import { getSubscriptions } from "../../actions/interests";
import { AppContext } from "../../App";
export default function InterestsPage({ allInterests }) {
  const {
    slices: {
      user: { email },
    },
  } = useContext(AppContext);

  const [suggestedInterests, setSuggestedInterests] = useState([]);
  const [subscribedInterests, setSubscribedInterests] = useState([]);
  useEffect(async () => {
    const { subscribedInterests, subscriptionIds } = await getSubscriptions(
      email || null
    );
    suggestedInterests = allInterests.filter(
      (interest) => !subscriptionIds.includes(interest.id)
    );
    setSuggestedInterests(suggestedInterests);
    setSubscribedInterests(subscribedInterests);
  });
  return (
    <div>
      <Lidebar interests={subscribedInterests} />
      <PostsContainer />
      <Ridebar suggestedInterests={suggestedInterests} />
    </div>
  );
}
