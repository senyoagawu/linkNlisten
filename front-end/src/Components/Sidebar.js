import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import styles from "./Views/Home.module.css";
import { searchSvg, interestsSvg } from "../svgs";
import Button from "./Buttons";

const Sidebar = ({
  searchbar,
  setRefresh,
  heading,
  iterables = [],
  route = "",
}) => {
  const {
    ui: { setModal },
  } = useContext(AppContext);
  console.log(setModal);

  return (
    <div className={styles.sidebar}>
      <div>
        <span>{heading}</span>
        <Button
          style={{ width: 30, height: 30 }}
          onClick={() => setModal("createInterest")}
          svg={interestsSvg}
          action={() => setModal("createInterest")}
        />
      </div>
      {searchbar && (
        <div className="search">
          <input type="text" placeholder={`search ${route.toLowerCase()}`} />
          {searchSvg}
        </div>
      )}
      <ul>
        {iterables.map((interest, index) => {
          return (
            <li key={index}>
              <img
                style={{ width: "30px", height: "30px" }}
                src={interest.link || "https://i.imgur.com/yGEyOfa.jpeg"}
                alt="interest banner"
              />
              <a href={`/interests/${interest.id}`}>{interest.name}</a>
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
