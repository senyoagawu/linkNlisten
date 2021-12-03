export const getSubscriptions = async (userId) => {
  //private. hence userId
  if (userId === null) return { subscribedInterests: [], subscriptionIds: [] };
  return await myGet(`/api/interests/subscriptions/${userId}`);
};

export const subscribeTo = async (userId, interestId) => {
  return await myGet(`/api/subscriptions/add/${userId}/${interestId}`);
};

export const unsubscribeFrom = async (userId, interestId) => {};
return await myGet(`/api/subscriptions/remove/${userId}/${interestId}`);
