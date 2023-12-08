const User = require("../schema/userSchema");
const crypto = require("crypto")

const handleRegister = async (req, res) => {
  const { fullName, email, catigory, password, state, role, contestant, code } =
    req.body;

  const duplicate = User.findOne({ email });
  if (duplicate) return res.sendStatus(403);

  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 100000; // You can adjust this based on your security requirements
  const keylen = 64; // Key length in bytes
  const digest = 'sha512'; // Hashing algorithm

  const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  

  const newUser = new User({
    fullName,
    password: hashedPassword,
    email,
    catigory,
    state,
    role,
    contestant,
    verified: false,
    code: code,
    salt,
  });
  newUser.save()
  .then((data) =>{
   res.send(data)
  }
   );
};

module.exports = handleRegister;
