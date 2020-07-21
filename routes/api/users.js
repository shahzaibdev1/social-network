const express = require("express");
const router = express.Router();

// @route   Get api/users/test
// @desc    Tests users Route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Users router is working..." })
);

module.exports = router;
