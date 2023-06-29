import { AnyAction } from "redux";
import { User } from "../../types/user";

export enum UserActionTypes {
  LOGIN = "users/login",
  LOGOUT = "users/logout",
}

export type UserState = {
  currentUser: User | null;
};

const initialState: UserState = {
  currentUser: null,
};

export const loginUser = (payload: User) => ({
  type: UserActionTypes.LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT,
  payload: null,
});

export function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, currentUser: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
}
