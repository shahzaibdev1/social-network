const express = require("express");
const User = require("../../config/models/User");
const router = express.Router();

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
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400);
    }
  });
});
module.exports = router;
