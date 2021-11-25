import React, { useContext } from "react";
import styles from "./Post.module.css";
import { AppContext } from "../../App";
import { deletePost } from "../../utils/ajax";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

const Post = ({ post }) => {
  return post ? (
    <div className="postWrapper">
      <PostHeader post={post} />
      <PostBody body={post.body} />
      {/* <Reactions/>  */}
    </div>
  ) : null;
};

export default Post;
