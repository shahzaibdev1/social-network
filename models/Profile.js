const mongoose = require("mongoose");
const schema = mongoose.Schema;

const profileSchema = new schema({});

module.exports = Profile = mongoose.model("users", profileSchema);
