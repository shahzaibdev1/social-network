const express = require("express");
const router = express.Router();
const mongoos = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { session } = require("passport");

// @route   Get api/profile/test
// @desc    Tests profile Route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Profile router is working..." })
);

// @route   Get api/profile/
// @desc    Get current User's Profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noProfile = "There's no profile for this user";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404));
  }
);

module.exports = router;
