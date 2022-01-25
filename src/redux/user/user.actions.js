import { userActionTypes } from "./user.types"

export const signInWithGoogleStart = () => ({
  type: userActionTypes.SIGNIN_WITH_GOOGLE_START
});

export const signInWithEmailStart = emailAndPassword => ({
  type: userActionTypes.SIGNIN_WITH_EMAIL_START,
  payload: emailAndPassword
});

export const signInWithSuccess = user => ({
  type: userActionTypes.SIGNIN_WITH_SUCCESS,
  payload: user
});

export const signInWithFailure = error => ({
  type: userActionTypes.SIGNIN_WITH_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: userActionTypes.USER_LOGOUT_START
});

export const signOutSuccess = () => ({
  type: userActionTypes.USER_LOGOUT_SUCCESS,
  payload: null
});

export const signOutFailure = error => ({
  type: userActionTypes.USER_LOGOUT_FAILURE,
  payload: error
});

export const signUpStart = (emailAndPassword) => ({
  type: userActionTypes.SIGNUP_START,
  payload: emailAndPassword
});

export const signUpSuccess = user => ({
  type: userActionTypes.SIGNUP_SUCCESS,
  payload: user
});

export const signUpFailure = () => ({
  type: userActionTypes.SIGNUP_FAILURE
});
