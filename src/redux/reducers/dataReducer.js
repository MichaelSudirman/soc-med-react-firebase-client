import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case LIKE_POST:

    // eslint-disable-next-line no-fallthrough
    case UNLIKE_POST:
      const unlikeIndex = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[unlikeIndex] = action.payload;
      return {
        ...state
      };

    case DELETE_POST:
      const deleteIndex = state.posts.findIndex(post => post.postId === action.payload);
      state.posts.splice(deleteIndex, 1);
      return {
        ...state
      };

    default:
      return state;
  }
}
