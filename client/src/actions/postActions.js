import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
} from "./types";

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

// Get POSTS
export const getPosts = () => (dispach) => {
  dispach(setPostLoading());
  axios
    .get("/api/posts")
    .then((res) => {
      dispach({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispach({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// Delete Post
export const deletePost = (id) => (dispach) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) => {
      dispach({
        type: DELETE_POST,
        payload: id,
      });
    })
    .catch((err) =>
      dispach({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add like
export const addLike = (id) => (dispach) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => {
      dispach(getPosts());
    })
    .catch((err) =>
      dispach({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// remove like
export const removeLike = (id) => (dispach) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => {
      dispach(getPosts());
    })
    .catch((err) =>
      dispach({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};
