const Vote = require("../schema/voteSchema");

const handleGetVote = (req, res) => {
  Vote.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports = handleGetVote;
