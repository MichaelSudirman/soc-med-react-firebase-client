import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from "../types";

const initialState = {
  authenticatied: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticatied: true
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        authenticatied: true,
        ...action.payload
      };

    default:
      return state;
  }
}
