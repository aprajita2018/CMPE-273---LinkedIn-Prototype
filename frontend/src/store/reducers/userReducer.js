import {LOGIN_USER, SIGNUP_USER, LOGOUT_USER, GET_ALL_JOBS, SET_CURRENT_JOB} from '../actions/actionTypes';

const initialState = {
  user  : {},
  token : "",
  name  : "",
};

export default function(state = initialState, action) {

    switch (action.type) {
      
      case LOGIN_USER:
        return {
          ...state,
          token   : action.payload.token,  //Adding token to application state store
          user    : action.payload.user,     //Adding user object to store
          name    : action.payload.user.name,
          user_type: action.payload.user.user_type,
          email   : action.payload.user.email,
          headline: action.payload.user.headline,
        }

      case SIGNUP_USER:
        return {
          ...state,
        }
      
      case GET_ALL_JOBS:
        return {
          ...state,
          jobs: action.payload.jobs,
        }

      case SET_CURRENT_JOB:{
        return {
          ...state,
          currentjob: action.payload,
        }
      }

      case LOGOUT_USER:
        console.log("Logging out user. Resetting users store");
        return {
          ...initialState  // resetting the state
        }

      default:
        return state;
    }
  }
  
  