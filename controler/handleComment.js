const Comment = require("../schema/comment");

const handleComment = (req, res) => {
  const { comment, userId, commenterId } = req.body;

  const newComment = new Comment({
    comment,
    userId,
    commenterId,
  });

  newComment
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};

module.exports = handleComment;
