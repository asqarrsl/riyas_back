const User = require("../model/user");

module.exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!(email && password && first_name && last_name)) {
    res.status(400).send("All input is required");
  }
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  user.token = token;
  res.status(201).json(user);
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send("All input is required");
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
    res.status(200).json(user);
  }
  res.status(400).send("Invalid Credentials");
};


module.exports.logout = (req, res) => {
//   req.logOut();
//   req.flash("success", "Logged Out Successfully");
//   res.redirect("/campgrounds");
};
