import { User } from "../../types/user";
import UserActionTypes from "./action.types";

type UserAction = {
  type: string;
  payload: User;
};

const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, currentUser: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default userReducer;
