import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../App";

export default function Feed() {
  const [subcribedPosts, setSubscribedPosts] = useState([]);
  const {
    slices: {
      user: { email },
    },
  } = useContext(AppContext);

  // useEffect(
  //   () =>
  //     (async () => {
  //       const { posts } = getSubscribedPosts(email | null);
  //       setSubscribedPosts(posts);
  //     })(),
  //   [email]
  // );
  return <h1>Feed</h1>;
}
