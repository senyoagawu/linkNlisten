import { myPut, myPost, myDelete, myGet } from "../utils/ajax";

export const getPosts = (email) => {
  const theGet = myGet(`/api/posts/${email}/`);
  console.log(theGet);
  return theGet;
};

export const getIndividualPosts = (email) => {
  return myGet(`/api/posts/individual/${email}/`);
};

export const createPost = (data) => {
  console.log(data);
  return myPost(`/api/posts/`, data);
};

export const editPost = (postId, userId, data) => {
  console.log(postId, userId, data);
  return myPut(`/api/posts/${postId}/${userId}`, data);
};

export const deletePost = (postId, userId) => {
  return myDelete(`/api/posts/${postId}/${userId}`);
};
