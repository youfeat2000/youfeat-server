const Vote = require("../schema/voteSchema");

const handleVote = async(req, res) => {
  const { userName, videoTitle, userId, videoName, voterId } = req.body;

  const foundVote = await Vote.findOne({voterId})
  if(foundVote) {
    return res.sendStatus(207)
  }

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
