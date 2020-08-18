import axios from "axios";
import setAuthToken from "../utils.js/setAuthToken";
import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

//Register the user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`/api/users/register`, userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login the user - Get the the JWT token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // get token from res object
      const { token } = res.data;
      // save token to localStorage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode the user token
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set login user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
