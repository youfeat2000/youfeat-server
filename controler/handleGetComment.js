const Comment = require("../schema/comment");

const handleGetComment = (req, res) => {
  Comment.find()
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400));
};

module.exports = handleGetComment;
