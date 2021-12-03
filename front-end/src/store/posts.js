import * as postsActions from "../actions/posts";

const ADD_POST = "posts/ADD_POST";
const REMOVE_POST = "posts/REMOVE_POST";
const FETCH_POSTS = "posts/FETCH_POSTS";
// const FETCH_MULTIPLE

const addPost = (post) => ({
  action: ADD_POST,
  payload: post,
});

const removePost = (postId) => ({
  action: REMOVE_POST,
  payload: postId,
});

const fetchPosts = (posts) => ({
  action: FETCH_POSTS,
  payload: posts,
});
// exports

export const getPosts =
  (...interestIds) =>
  async (dispatch) => {
    const { posts } = await postsActions.getPosts();
    dispatch(fetchPosts(posts));
  };
export const deletePost = (postId) => async (dispatch) => {
  const res = await postsActions.deletePost(postId);
  const { message, status } = await res.json();

  dispatch(removePost(postId));
};
export const createPost = (post) => async (dispatch) => {
  const res = await postsActions.createPost(post);
  const { post } = await res.json();

  dispatch(createPost(post));
};

const initialState = {
  posts: {},
  allIds: [],
};

const arrayToObj = (arr) => {
  const slice = {};

  arr.forEach((entity) => (slice[entity.id] = entity));
  return slice;
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: arrayToObj(action.paylaod),
        allIds: action.payload.map((post) => post.id),
      };
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        },
        allIds: [...state.allIds, action.payload.id],
      };
    case REMOVE_POST:
      const { [action.payload.id]: removedPost, ...newState } = state;
      return {
        ...state,
        posts: newState,
        allIds: state.allIds.filter((post) => post.id !== action.payload.id),
      };
    default:
      return state;
  }
}
