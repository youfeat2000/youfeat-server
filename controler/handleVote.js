const Vote = require("../schema/voteSchema");

const handleVote = (req, res) => {
  const { userName, videoTitle, userId, videoName, voterId } = req.body;

  const newVote = new Vote({
    userName,
    videoTitle,
    userId,
    voterId,
    videoName,
  });

  newVote
    .save()
    .then((data) => res.send(data))
    .catch(() => res.sendStatus(400));
};

module.exports = handleVote;
