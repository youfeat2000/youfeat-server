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
  salt: {
    require: true,
    type: String,
  },
  refreshtoken: {
    require: true,
    type: String,
  },
  profileImage: String,
  profileImageData: Buffer,
  state: String,
  bio: String,
  catigory:String,
  video: Object,
  highschool:String,
  dob: Date,
  role: {
    require: true,
    type: Number,
  },
  code: Number,
  contestant: {
    type: Boolean,
    require,
  },
  verified: {
   type: Boolean,
   default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
