const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");
const crypto = require('crypto')

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(402);

  const foundUser = await User.findOne({ email });
  if (!foundUser) return res.sendStatus(401);

  const iterations = 100000; // Same as used in the hashing function
  const keylen = 64; // Same as used in the hashing function
  const digest = 'sha512'; // Same as used in the hashing function
  const storedSalt = ()=>{
     if(foundUser.salt){
    return foundUser.salt;
  }else{
    return "nosalt"
  }
}
  console.log(storedSalt())

  // Hash the user-entered password with the stored salt
  const hashedPasswordToVerify = crypto.pbkdf2Sync(password, storedSalt(), iterations, keylen, digest).toString('hex');

  // Compare the hashed password with the stored hashed password
  const verify = hashedPasswordToVerify === foundUser.password;

  if (!verify) return res.sendStatus(401);

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
