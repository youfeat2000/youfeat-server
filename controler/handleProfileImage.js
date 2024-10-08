const fs = require("fs");
const User = require("../schema/userSchema");
const handleProfileImage = (req, res) => {
  const { filename } = req.file;
  const { userid } = req.params;

  User.findById(userid)
    .then((data) => {
      console.log(data);
      if (data.profileImage) {
        fs.unlinkSync(`Images/${data.profileImage}`);
      }
    })
    .catch((err) => console.log(err));
  User.findByIdAndUpdate(userid, { profileImage: filename, profileImageData: fs.readFileSync(`Images/${filename}`) })
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400));
};

module.exports = handleProfileImage;
