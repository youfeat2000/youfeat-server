const User = require("../schema/userSchema");

const handleLogout = (req, res) => {
  const refreshtoken = req.cookies.jwt;
  if (!refreshtoken) return res.sendStatus(208);

  User.findOneAndUpdate({ refreshtoken }, { refreshtoken: "" })
    .then((data) => {
      res.clearCookie("jwt", refreshtoken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: true,
      });
      res.sendStatus(208);
    })
    .catch((err) => console.log(err));
};

module.exports = handleLogout;
