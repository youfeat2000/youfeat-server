const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(402);

  const foundUser = await User.findOne({ email });
  if (!foundUser) return res.sendStatus(401);

  const verified = await bcrypt.compare(password, foundUser.password);
  if (!verified) return res.sendStatus(401);

  try {
    const accesstoken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    const refreshtoken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN,
      { expiresIn: "12d" }
    );

    User.findOneAndUpdate({ email: foundUser.email }, { refreshtoken }).catch(
      (err) => res.sendStatus(400)
    );

    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      sameSite: "None",
      path: "/",
      secure: true,
    });
    res.json({ accesstoken });
  } catch (err) {
    if (err) return res.sendStatus(400);
  }
};

module.exports = handleLogin;
