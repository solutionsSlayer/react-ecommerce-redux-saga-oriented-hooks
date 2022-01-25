import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGNIN_WITH_SUCCESS:
    case userActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: false
      }
    case userActionTypes.SIGNIN_WITH_FAILURE:
    case userActionTypes.USER_LOGOUT_FAILURE:
    case userActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        error: true
      }
    case userActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: false
      }
    default:
      return state;
  }
}

export default userReducer;