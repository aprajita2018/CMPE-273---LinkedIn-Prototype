import {LOGIN_USER, SIGNUP_USER, LOGOUT_USER} from "../actions/types";

const intialState = {
  user: {},
  token: "",
  name: "",
};

export default function(state = intialState, action) {
    switch (action.type) {
      case LOGIN_USER:
        return {
          ...state,
          token: action.payload.token,  //Adding token to application state store
          user: action.payload.user,     //Adding user object to store
          name: action.payload.user.name,
          user_type: action.payload.user.user_type
        }

      case SIGNUP_USER:
        return {
          ...state,
        }

      case LOGOUT_USER:
        console.log("Logging out user. Resetting users store");
        return {
          ...intialState  // resetting the state
        }

      default:
        return state;
    }
  }
  
  