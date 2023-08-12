const User = require("../schema/userSchema");

const handleLogout = (req, res) => {
  const refreshtoken = req.cookies.jwt;
  if (!refreshtoken) return res.sendStatus(208);

  User.findOneAndUpdate({ refreshtoken }, { refreshtoken: "" })
    .then((data) => {
      return res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        path: "/",
        secure: true,
      });
    })
    .catch((err) => console.log(err));
};

module.exports = handleLogout;
