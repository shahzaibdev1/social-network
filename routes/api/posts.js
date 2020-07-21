const express = require("express");
const router = express.Router();

// @route   Get api/posts/test
// @desc    Tests posts Route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Posts router is working..." })
);

module.exports = router;
