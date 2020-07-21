const express = require("express");
const router = express.Router();

// @route   Get api/profile/test
// @desc    Tests profile Route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Profile router is working..." })
);

module.exports = router;
