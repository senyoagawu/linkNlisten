import * as subscriptionsActions from "../actions/subscriptions";

const SUBSCRIBE = "subscriptions/SUBSCRIBE";
const UNSUBSCRIBE = "subscriptions/UNSUBSCRIBE";
const FETCH_SUBSCRIPTIONS = "subscriptions/FETCH_SUBSCRIPTIONS";

const subscribe = (interestId) => ({
  action: SUBSCRIBE,
  payload: interestId,
});

const unsubscribeInterest = (interestId) => ({
  action: UNSUBSCRIBE,
  payload: interestId,
});

const fetchSubscriptions = (interestIds) => ({
  action: FETCH_SUBSCRIPTIONS,
  payload: interestIds,
});
// exports

export const getSubscriptions = () => async (dispatch) => {
  const { subscriptions } = await subscriptionsActions.getSubscriptions();
  dispatch(fetchSubscriptions(subscriptions));
};
export const subscribeTo = (interestId) => async (dispatch) => {
  const { message } = await subscriptionsActions.subscribeTo(interestId);

  dispatch(subscribe(interestId));
};
export const unsubscribe = (interestId) => async (dispatch) => {
  const { message } = await subscriptionsActions.unsubscribeFrom(interestId);

  dispatch(unsubscribe(interestId));
};

const initialState = []; //ids of groups current user is subscribed to

const arrayToObj = (arr) => {
  const slice = {};

  arr.forEach((entity) => (slice[entity.id] = entity));
  return slice;
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS:
      return {
        ...state,
        interests: arrayToObj(action.paylaod),
        allIds: action.payload.map((interest) => interest.id),
      };
    case SUBSCRIBE:
      return {
        ...state,
        interests: {
          ...state.interests,
          [action.payload.id]: action.payload,
        },
        allIds: [...state.allIds, action.payload.id],
      };
    case UNSUBSCRIBE:
      const { [action.payload.id]: unsubscribedInterest, ...newState } = state;
      return {
        ...state,
        interests: newState,
        allIds: state.allIds.filter(
          (interest) => interest.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
