import React, { useEffect, useState } from "react";

export default function Feed() {
  const [subcribedPosts, setSubscribedPosts] = useState([]);
  useEffect(async () => {
    const { posts } = getSubscribedPosts();
    setSubscribedPosts(posts);
  });
  return <h1>Feed</h1>;
}
