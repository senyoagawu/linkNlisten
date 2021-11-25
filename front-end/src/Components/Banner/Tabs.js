import React, { useContext } from "react";
import { TabContext } from "../../../Context/TabContext";
export default function Tab() {
  const { selectedTab, setSelectedTab } = useContext(TabContext);
  const selectTab = (e) => setSelectedTab(e.target.id);
  return (
    <div className="tabs">
      <div className="tabs__title">
        <span id="posts" onClick={selectTab}>
          Posts
        </span>
      </div>
      <div className="tabs__title">
        <span id="members" onClick={selectTab}>
          Members
        </span>
      </div>
    </div>
  );
}
