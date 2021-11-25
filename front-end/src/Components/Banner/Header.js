import React, { useState } from "react";
import { infoSvg } from "../../svgs";

export default function Header({ interest }) {
  const [infoActive, setInfoActive] = useState(false);
  const name = infoActive ? "About" + interest.name : interest.name;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span> {name}</span>
      <span>{infoSvg}</span>
    </div>
  );
}
