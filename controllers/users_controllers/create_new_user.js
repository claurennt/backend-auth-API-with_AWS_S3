/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");

const User = require("../../db/models/UsersModel");

const create_new_user = async (req, res, next) => {
  try {
    // check if user email already exists
    const userExists = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "A user with this email is already registered.",
      });
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });

    await newUser.save();

    const { _id, email } = newUser;

    const token = newUser.createToken();

    return res.set("x-authorization-token", token).json({ _id, email });
  } catch (e) {
    next(e);
  }
};

module.exports = { create_new_user };
