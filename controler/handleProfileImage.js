const fs = require("fs");
const User = require("../schema/userSchema");
const handleProfileImage = (req, res) => {
  const { filename } = req.file;
  const { userid } = req.params;
  User.findByIdAndUpdate(userid, { profileImage: filename })
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400));
};

module.exports = handleProfileImage;
