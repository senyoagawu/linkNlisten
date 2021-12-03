import { myPut, myPost, myDelete, myGet } from "../utils/ajax";

export const getPosts = (interestIds) => {
  const fetches = Promise.all(
    interestIds.map((id) => myGet(`/api/interests/${id}`))
  );
  const postsByInterest = {};
  const postsById = {};
  fetches.forEach(({ interest }) => {
    postsByInterest[interest.id] = interest.posts;
    interest.posts.forEach((post) => {
      postsById[post.id] = post;
    });
  });

  return { postsByInterest, postsById };
};

export const getPost = (email) => {
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
