import React from "react";

export default function Lidebar({ entities }) {
  return (
    <ul>
      {entities.map((thing) => (
        <li>{thing.name}</li>
      ))}
    </ul>
  );
}
