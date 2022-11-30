import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
//import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",

};

const initialAuthState = {
  user: false,
  authToken: undefined,
};

export const reducer = persistReducer(
  { storage, key: "CHW-user", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {

      case actionTypes.Login: {
        
        const { authToken } = action.payload;
        return { authToken: authToken.authKey, user: authToken.user };
      }
      case actionTypes.Logout: {
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { state, user };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  logout: () => ({ type: actionTypes.Logout }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),

};

export function* saga() {}
