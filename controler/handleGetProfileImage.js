const fs = require("fs");

const handleGetProfileImage = (req, res) => {
  const { profilename } = req.params;
  const image = fs.readFileSync(`Images/${profilename}`);
  res.send(image);
};

module.exports = handleGetProfileImage;
