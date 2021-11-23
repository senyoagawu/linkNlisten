import { myPost, myDelete, myGet } from "../utils/ajax";

// return all interests
export const getInterests = async () => {
  return await myGet("/api/interests");
};

// return interests user is subscribed to
export const getSubscriptions = async () => {
  return await myGet("/api/subscriptions");
};

//create a new Interest
// headers: { Authorization: `Bearer ${token}` },
export const addInterest = async (payload) => {
  return await myPost("/api/interests/", payload);
};

export const deleteInterest = async (payload) => {
  return await myDelete("/api/interests/", payload);
};
