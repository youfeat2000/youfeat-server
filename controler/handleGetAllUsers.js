const User = require("../schema/userSchema");

const handleGetAllUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400));
};

module.exports = handleGetAllUsers;
