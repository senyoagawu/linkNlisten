import packageData from "../utils/packageData";
// const backendUrl = "http://localhost:5000/api";

export const myGet = async (path) => {
  const response = await fetch(path);
  return await response.json();
};

export const myPost = async (path, data) => {
  const body = JSON.stringify(data);
  const response = await fetch(path, {
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  });
  return await response.json();
};

export const myPut = async (path, data) => {
  const body = JSON.stringify(data);
  const response = await fetch(path, {
    method: "PUT",
    body,
  });
  return await response.json();
};

export const myDelete = async (path, data) => {
  const body = JSON.stringify(data);

  const response = await fetch(path, {
    method: "DELETE",
    body,
  });
  return await response.json();
};

//ACTIONS

export const editProfile = async (email, data) => {
  console.log(email, data);
  return await myPut(`/api/users/${email}/`, data);
};

// export const getInterests = () => {
//   return myGet("/api/interests/");
// };
// // headers: { Authorization: `Bearer ${token}` },
// export const addInterest = async (data) => {
//   console.log(data);
//   return await myPost("/api/interests/", data);
// };

// export const getUsersEmails = () => {
//   return myGet("/api/users");
// };

// export const getSubscribedInterests = (email) => {
//   //!how is this working (asynchronicity)
//   // if (!email) return;
//   // return myGet(`/api/interests/${email}/`);
// };

// export const followInterest = (email, id) => {
//   return myPost(`/api/interests_users/${email}/${id}/`);
// };
// export const unfollowInterest = (email, id) => {
//   return myDelete(`/api/interests_users/${email}/${id}/`);
// };

// export const getPosts = (email) => {
//   const theGet = myGet(`/api/posts/${email}/`);
//   console.log(theGet);
//   return theGet;
// };

// export const getIndividualPosts = (email) => {
//   return myGet(`/api/posts/individual/${email}/`);
// };

// export const createPost = (data) => {
//   console.log(data);
//   return myPost(`/api/posts/`, data);
// };

// export const editPost = (postId, userId, data) => {
//   console.log(postId, userId, data);
//   return myPut(`/api/posts/${postId}/${userId}`, data);
// };

// export const deletePost = (postId, userId) => {
//   return myDelete(`/api/posts/${postId}/${userId}`);
// };
