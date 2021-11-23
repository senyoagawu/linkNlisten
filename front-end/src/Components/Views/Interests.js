import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Lidebar from "../Lidebar";
import PostsFeed from "../MainFeed";
import Interests from "../InterestsContainer";

export default function InterestsPage({ allInterests }) {
  useEffect(async () => {
    const { subscribedInterests, subscriptionIds } = await getSubscriptions();
    const suggestedInterests = allInterests.filter(
      (interest) => !subscribedIds.includes(interest.id)
    );
  });
  return (
    <div>
      <Lidebar interests={myInterests} />
      <Feed />
      <Ridebar suggestedInterests={suggestedInterests} />
    </div>
  );
}
