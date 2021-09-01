import userTypes from "./user.types";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRRENT_USER,
  payload: user,
});
