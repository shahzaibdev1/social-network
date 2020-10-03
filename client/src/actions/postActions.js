import axios from "axios";
import { ADD_POST, GET_ERRORS } from "./types";

// Add Post

export const addPost = (postData) => (dispach) => {
  axios
    .post("/api/posts", postData)
    .then((res) => {
      dispach({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispach({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
