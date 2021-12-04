import { myPut, myPost, myDelete, myGet } from "../utils/ajax";

export const getPosts = async (...interestIds) => {
  if (["string", "number"].includes(typeof interestIds)) {
    interestIds = [interestIds];
  }

  const fetches = await Promise.all(
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

export const createPost = (body, authorsId, interestsId) => {
  return myPost(`/api/posts/`, { body, authorsId, interestsId });
};

export const editPost = (postId, authorsId, body) => {
  return myPut(`/api/posts/${postId}`, { body, authorsId });
};

export const deletePost = (postId, userId) => {
  return myDelete(`/api/posts/${postId}/${userId}`);
};
