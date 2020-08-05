const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");
const Profile = require("../../models/Profile");

// @route   Get api/posts/test
// @desc    Tests posts Route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Posts router is working..." })
);

// @route   POST api/posts
// @desc    create new posts
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let newPost = new Post({
      text: req.body.text,
      user: req.user.id,
      name: req.body.name,
      avatar: req.body.avatar,
    });
    newPost.save().then((post) => res.json(post));
  }
);

// @route   GET api/posts
// @desc    Get all the posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ noPosts: "No posts found." }));
});

// @route   GET api/posts/:id
// @desc    Get the post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ noPost: "No post found." }));
});

// @route   Delete api/posts/:id
// @desc    Delete the post by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postNotFound: "Post not found." })
        );
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like the post
// @access  Private
router.post(
  "like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User liked the post already" });
          }

          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postNotFound: "Post not found." })
        );
    });
  }
);

module.exports = router;
