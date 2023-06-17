const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userName: {
    rquire: true,
    type: String,
  },
  videoTitle: {
    require: true,
    type: String,
  },
  userId: {
    type: String,
    require: true,
  },
  voterId: {
    require: true,
    type: String,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
