import React, { useContext } from "react";
import styles from "./Post.module.css";
import { AppContext } from "../../App";
import { deletePost } from "../../utils/ajax";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import Button from "../Buttons";
const Post = ({ post }) => {
  return post ? (
    <div className={styles.post}>
      <PostHeader post={post} />
      <PostBody body={post.body} />
      <PostFooter authorsId={post.authors_id} post={post} />
      {/* <Reactions/>  */}
    </div>
  ) : null;
};

export default Post;
