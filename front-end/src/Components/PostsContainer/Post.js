import React, { useContext } from "react";
import styles from "./Post.module.css";
import { AppContext } from "../../App";
import { deletePost } from "../../utils/ajax";
import PostHeader from "./PostHeader";

const Post = ({ post }) => {
  const {
    state: {
      user: { id: userId },
    },
  } = useContext(AppContext);
  return (
    <div className="postWrapper">
      <PostHeader />
      {/* <PostBody/>
    <Reactions/> */}
    </div>
  );
};

export default Post;
