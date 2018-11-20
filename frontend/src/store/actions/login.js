// import axios from '../../axios-setup';

// import * as actionTypes from './actionTypes';
// //import {LOGIN_USER, SIGNUP_USER, UPDATE_USER, GET_USERDETAILS,GET_USERDETAILS_BYID, FETCH_OWNER, SEND_MSG, RECEIVE_MSGS, LOGOUT_USER} from './actiontypes';

// //function/ action to post the login form
// export const login = (values, callback) => dispatch =>  {    
//     axios.post('/login', values)
//         .then((res) => {
//             if(res.status === 200){  
//                 localStorage.setItem('jwt_token', res.data.token);
//                 dispatch({
//                     type : LOGIN_USER,
//                     payload: res.data
//                 });
//                 callback(res.data);
//             }
//             else{
//                 console.log("Some error")
//                 callback({status: "ERROR", message: "Could not log in"});
//             }
            
//         });
// }

// //function/ action to post the user sign up form
// export const signup = (values, callback) => dispatch => {        
//     axios.post('/userSignup', values)
//         .then((res) => {
//             if(res.status === 200){  
//                 dispatch({
//                     type : SIGNUP_USER,
//                     payload: res.data
//                 });
//                 callback(res.data);
//             }
//         });
// }
