const User = require("../schema/userSchema");

const handleGetUser = (req, res) => {
  const refreshtoken = req.cookies.jwt;
  if (!refreshtoken) return res.sendStatus(403);

  User.findOne({ refreshtoken })
    .then((data) => {
      data.profileImageData = null
      res.json(data)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

module.exports = handleGetUser;
