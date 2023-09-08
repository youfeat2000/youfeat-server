const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    require,
  },
  userId: {
    type: String,
    require,
  },
  commenterId: {
    type: String,
    require,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
