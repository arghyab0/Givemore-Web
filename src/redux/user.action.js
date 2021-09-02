import userTypes from "./user.types";

//firebase utils
import { auth, handleUserProfile, GoogleProvider } from "../firebase/utils";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSucces = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

//SDSAC
//SDSAC
//SDSAC
//SDSAC
//SDSAC

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRRENT_USER,
  payload: user,
});

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      })
    );
  } catch (err) {
    // console.log(err);
  }
};

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    if (password !== confirmPassword) {
      const err = ["Passwords don't match"];
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err,
      });

      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });

      dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      url: "http://localhost:3000/login",
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true,
          });
        })
        .catch(() => {
          const err = "Email not found";
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: err,
          });
        });
    } catch (err) {
      // console.log(err);
    }
  };

export const resetAuth = () => ({
  type: userTypes.RESET_AUTH,
});