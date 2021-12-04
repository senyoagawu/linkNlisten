import * as postsActions from "../actions/posts";

const ADD_POST = "posts/ADD_POST";
const REMOVE_POST = "posts/REMOVE_POST";
const UPDATE_POST = "posts/UPDATE_POST";
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

const updatePost = (post) => ({
  action: UPDATE_POST,
  payload: post,
});
// exports

export const getPosts =
  (...interestIds) =>
  async (dispatch) => {
    const { posts } = await postsActions.getPosts();
    dispatch(fetchPosts(posts));
  };
export const deletePost = (postId, userId) => async (dispatch) => {
  const { message, status } = await postsActions.deletePost(postId, userId);
  dispatch(removePost(postId));
};
export const editPost = (postId, authorsId, body) => async (dispatch) => {
  const { post } = await postsActions.editPost(postId, authorsId, body);
  dispatch(createPost(post));
};
export const createPost =
  (authorsId, body, interestsId) => async (dispatch) => {
    const { post } = await postsActions.createPost(
      authorsId,
      body,
      interestsId
    );
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
    case UPDATE_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.payload.id]: action.payload },
        allIds: [...state.allIds, [action.payload.id]],
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
