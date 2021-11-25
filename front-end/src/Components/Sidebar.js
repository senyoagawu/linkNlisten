import React, { useContext } from "react";
import { AppContext } from "../App";
import styles from "./Views/Home.module.css";
import { searchSvg, interestsSvg } from "../svgs";

const Sidebar = ({ heading, iterables = [], route = "" }) => {
  return (
    <div className={styles.sidebar}>
      <div>
        <span>{heading}</span>
        {interestsSvg}
      </div>
      <div className="search">
        <input type="text" placeholder={`search ${route.toLowerCase()}`} />
        {searchSvg}
      </div>
      <ul>
        {iterables.map((interest, index) => {
          return (
            <li key={index}>
              <img
                style={{ width: "30px", height: "30px" }}
                src={interest.link || "https://i.imgur.com/yGEyOfa.jpeg"}
                alt="interest banner"
              />
              <a href={`/${heading}/${interest.id}`}>{interest.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// bio
// edit profile
// interests
// # interests
// # interests created
// # posts made

export default Sidebar;
