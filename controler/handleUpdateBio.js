const User = require("../schema/userSchema");

const handleBioUpdate = (req, res) => {
  const { bio } = req.body;

  User.findByIdAndUpdate(req.params.id, { bio })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports = handleBioUpdate;
