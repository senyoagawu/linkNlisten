import { myPost, myDelete, myGet } from "../utils/ajax";

// return all interests
export const getInterests = async () => {
  return await myGet("/api/interests");
};

// return interests user is subscribed to
export const getSubscriptions = async (email) => {
  if (email === null) return { subscribedInterests: [], subscriptionIds: [] };
  return await myGet(`/api/subscriptions/${email}`);
};

//create a new Interest
// headers: { Authorization: `Bearer ${token}` },
export const addInterest = async (payload) => {
  return await myPost("/api/interests/", payload);
};

export const deleteInterest = async (payload) => {
  return await myDelete("/api/interests/", payload);
};

export const getSubscribedPosts = async (email) => {
  if (email === null) return { posts: [] };

  return await myGet(`/api/posts/interest-feed/${email}`);
};

export const followInterest = (email, id) => {
  return myPost(`/api/interests_users/${email}/${id}/`);
};
export const unfollowInterest = (email, id) => {
  return myDelete(`/api/interests_users/${email}/${id}/`);
};

export const getSubscribedInterests = (email) => {
  if (!email) return;
  return myGet(`/api/interests/${email}/`);
};
