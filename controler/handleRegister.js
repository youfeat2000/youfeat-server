const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");

const handleRegister = async (req, res) => {
  const { fullName, email, phoneNumber, password, state, role, contestant, code } =
    req.body;

  const duplicate =await User.findOne({ email });
  if (duplicate) return res.sendStatus(403);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    password: hashedPassword,
    email,
    phoneNumber,
    state,
    role,
    contestant,
    verified: false,
    code: code,
  });
  newUser.save()
  .then((data) =>{
   res.send(data)
  }
   );
};

module.exports = handleRegister;
