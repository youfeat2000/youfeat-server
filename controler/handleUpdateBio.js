const User = require("../schema/userSchema");

const handleBioUpdate = (req, res) => {
  const { bio, state, dob, highschool } = req.body;

  User.findByIdAndUpdate(req.params.id, { bio, state, dob, highschool })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports = handleBioUpdate;
