const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// @route   Get api/users/test
// @desc    Tests users Route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Users router is working..." })
);

// @route Get /api/users/register
// @desc  Registers User
// access Public
router.post("/register", (req, res) => {
  // Email validation
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      // Avatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default
      });

      // Adding new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      // Password Hashing
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route Get /api/users/login
// @desc  Login User | returning JWT Token
// access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ email: "User not found" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // If User and pass matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // JWT payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect Password" });
      }
    });
  });
});

// @route Get /api/users/current
// @desc  Passport-JWT | session functionality
// access Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
