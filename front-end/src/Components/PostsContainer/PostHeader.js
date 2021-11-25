import React from "react";
import formatTime from "../../utils/formatTimeAgo";
import { clockSvg } from "../../svgs";

export default function PostHeader({
  post: {
    author: { profile_pic, first_name },
    created_at,
  },
}) {
  return (
    <ul className="post-header">
      <li>
        <img
          className="post_author_image"
          style={{ height: "50px", width: "50px" }}
          src={profile_pic}
          alt="profile_pic"
        />
      </li>
      <li>
        <div className="username">
          <span className="post_author">{first_name}</span>
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
  );
}
