const jsonwebtoken = require("jsonwebtoken");

const handleRefresh = (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) return res.sendStatus(401);

  jsonwebtoken.verify(jwt, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    }

    const accesstoken = jsonwebtoken.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.json({ accesstoken });
  });
};

module.exports = handleRefresh;
