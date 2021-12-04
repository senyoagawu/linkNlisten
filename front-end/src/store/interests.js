import * as interestsActions from "../actions/interests";

const ADD_INTEREST = "interests/ADD_INTEREST";
const REMOVE_INTEREST = "interests/REMOVE_INTEREST";
const FETCH_INTERESTS = "interests/FETCH_INTERESTS";

const addInterest = (interest) => ({
  action: ADD_INTEREST,
  payload: interest,
});

const removeInterest = (interestId) => ({
  action: REMOVE_INTEREST,
  payload: interestId,
});

const fetchInterests = (interests) => ({
  action: FETCH_INTERESTS,
  payload: interests,
});
// exports
export const subscribeTo = (interestId) => async (dispatch) => {
  const { message } = await interestsActions.getInterests();

  dispatch(addInterest(interestId));
};
export const getInterests = () => async (dispatch) => {
  const { interests } = await interestsActions.getInterests();
  dispatch(fetchInterests(interests));
};
export const deleteInterest = (interestId) => async (dispatch) => {
  const res = await interestsActions.deleteInterest(interestId);
  const { message, status } = await res.json();

  dispatch(removeInterest(interestId));
};
export const createInterest = (interest) => async (dispatch) => {
  const res = await interestsActions.addInterest(interest);
  const { interest } = await res.json();

  dispatch(createInterest(interest));
};

const initialState = {
  interests: {},
  allIds: [],
};

const arrayToObj = (arr) => {
  const slice = {};

  arr.forEach((entity) => (slice[entity.id] = entity));
  return slice;
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INTERESTS:
      return {
        ...state,
        interests: arrayToObj(action.paylaod),
        allIds: action.payload.map((interest) => interest.id),
      };
    case ADD_INTEREST:
      return {
        ...state,
        interests: {
          ...state.interests,
          [action.payload.id]: action.payload,
        },
        allIds: [...state.allIds, action.payload.id],
      };
    case REMOVE_INTEREST:
      const { [action.payload.id]: removedInterest, ...newState } = state;
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
