import React from "react";
import Tabs from "./Tabs";
import Header from "./Header";

const defaultBanner =
  "https://images.unsplash.com/photo-1637406370002-490abf38afe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80";

export default function Banner({ interest }) {
  const backgroundImage = interest.image || defaultBanner;
  return (
    <div
      style={{
        background: `url(${backgroundImage})`,
        width: "100%",
        height: "100%",
        backgroundSize: "100%",
      }}
    >
      <Header interest={interest} />

      <Tabs />
    </div>
  );
}
