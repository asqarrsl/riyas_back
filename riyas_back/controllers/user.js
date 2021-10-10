const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports.register = async (req, res) => {
  const { first_name, last_name, email, password, mobile } = req.body;
  console.log(req.body);
  if (!(email && password && first_name && last_name)) {
    return res.status(400).send("All input is required");
  }
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log(encryptedPassword);
  const mail = email.toLowerCase();
  const user = new User({
    first_name,
    last_name,
    email: mail,
    password: encryptedPassword,
    mobile,
  });
  await user.save();
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  console.log(4);
  user.token = token;
  res.status(201).json(user);
  return
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, password, mobile } = req.body;

  if (!(password && first_name && last_name)) {
    res.status(400).send("All input is required");
    return
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(id, {
    first_name,
    last_name,
    password: encryptedPassword,
    mobile,
  });
  await user.save();

  return res.status(201).json(user);
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send("All input is required");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    return res.status(200).json(user);
  }
  return res.status(400).send("Invalid Credentials");
};

module.exports.logout = (req, res) => {
  // req.logOut();

  const authHeader = req.headers["x-access-token"];
  console.log(authHeader);
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      return res.status(202).send("Logged Out Successfully");
    } else {
      return res.send({ msg: err });
    }
  });
};
