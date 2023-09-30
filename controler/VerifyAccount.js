const User = require('../schema/userSchema')
const jwt = require('jsonwebtoken')

const handleVerifyEmail =async (req, res) =>{
    const {code} = req.body;

    const user =await User.findOne({code: Number(code)})
    if(!user) return res.sendStatus(401)

    try {
        const accesstoken = jwt.sign(
          { email: user.email },
          process.env.ACCESS_TOKEN,
          { expiresIn: "15m" }
        );
    
        const refreshtoken = jwt.sign(
          { email: user.email },
          process.env.REFRESH_TOKEN,
          { expiresIn: "12d" }
        );
    
        User.findOneAndUpdate({ email: user.email }, { refreshtoken, code: 000000, verified: true }).catch(
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
}

module.exports = handleVerifyEmail