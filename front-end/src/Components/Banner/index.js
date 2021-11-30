import React from "react";
import Tabs from "./Tabs";
import Header from "./Header";
export default function Banner({ interest }) {
  return (
    <div>
      <h1>{interest?.name}</h1>
    </div>
  );
}
