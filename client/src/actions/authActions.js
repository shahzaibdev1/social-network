import axios from "axios";
import { GET_ERRORS } from "./types";

//Register the user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`http://127.0.0.1:5000/api/users/register`, userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
