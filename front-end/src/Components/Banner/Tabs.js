import React, { useContext } from "react";
import { TabContext } from "../../App";
import "./Tabs.module.css";
export default function Tabs() {
  const { selectedTab, setSelectedTab } = useContext(TabContext);
  const selectTab = (e) => setSelectedTab(e.target.id);
  return (
    <div className="tabs">
      <div className="tabs__title">
        <span
          className={selectedTab === "posts" ? "active" : ""}
          id="posts"
          onClick={selectTab}
        >
          Posts
        </span>
      </div>
      <div className="tabs__title">
        <span
          className={selectedTab === "members" ? "active" : ""}
          id="members"
          onClick={selectTab}
        >
          Members
        </span>
      </div>
    </div>
  );
}
