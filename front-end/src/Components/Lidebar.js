import React from "react";

export default function Sidebar({ entities }) {
  return (
    <ul>
      {entities.map((thing) => (
        <li>{thing.name}</li>
      ))}
    </ul>
  );
}
