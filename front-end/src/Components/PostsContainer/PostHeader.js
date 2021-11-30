import React, { useContext } from "react";
import formatTime from "../../utils/formatTimeAgo";
import { clockSvg } from "../../svgs";
import { AppContext } from "../../App";
export default function PostHeader({ post: { created_at, authors_id } }) {
  const {
    slices: { usersList },
  } = useContext(AppContext);
  // : {
  //   author: { profile_pic, first_name },
  //   created_at,
  // }
  // const { first_name, profile_pic } =  usersList[authors_id];
  console.log("users list", usersList);
  return (
    usersList &&
    usersList.length > 0 && (
      <ul className="post-header">
        <li>
          <img
            className="post_author_image"
            style={{ height: "50px", width: "50px" }}
            src={usersList[authors_id].profile_pic}
            alt="profile_pic"
          />
        </li>
        <li>
          <div className="username">
            <span className="post_author">
              {usersList[authors_id].first_name}
            </span>
          </div>
        </li>

        <li>
          <span className="posted_at">{formatTime(created_at)}</span>
          <span>{clockSvg}</span>
        </li>
        <li>
          <button></button>
        </li>
      </ul>
    )
  );
}
