const fs = require("fs");
const User = require('../schema/userSchema')

const handleGetProfileImage = (req, res) => {
  const { profilename } = req.params;
  //const image = fs.readFileSync(`Images/${profilename}`);
  User.findOne({profileImage: profilename})
  .then((data)=>{
    res.send(data.profileImageData)
  })
  .catch((err)=>console.log(err))
};

module.exports = handleGetProfileImage;
