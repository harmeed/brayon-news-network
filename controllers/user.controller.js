const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminSignup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(password && email)) {
      return res.status(400).json({ message: "complete the fields" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const payload = {
      _id: user._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("access-token", token);
    return res
      .status(202)
      .json({ message: "Admin logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};


