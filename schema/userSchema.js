const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  phoneNumber: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  refreshtoken: {
    require: true,
    type: String,
  },
  profileImage: String,
  state: String,
  bio: String,
  video: Object,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
