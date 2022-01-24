const User = require("../models/User");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  loginController: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); // select expiclity password

    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "invalid email or password" });

    let validPassword = await user.correctPassword(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password..." });

    res.status(200).json({
      success: true,
      message: `Login Successfull.`,
      user: _.pick(user, [
        "_id",
        "firstname",
        "lastname",
        "username",
        "email",
        "scc",
        "role",
        "school",
        "department",
      ]),
      token: user.generateAuthToken(),
    });
  },
  registerController: catchAsync(async (req, res) => {
    const { firstname, lastname, email, username, scc, password } = req.body;

    // Check if user email or username exists
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "email already registered" });

    user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "username taken" });

    user = await User.create({
      firstname,
      lastname,
      email,
      username,
      scc,
      password,
    });

    // Generate Account Activation Link
    // const activationToken = user.createAccountActivationLink();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: `Registration successfull.`,
      user: _.pick(user, [
        "_id",
        "firstname",
        "lastname",
        "username",
        "email",
        "scc",
        "role",
        "school",
        "department",
      ]),
      token: user.generateAuthToken(),
    });
  }),
};
