/* eslint-disable consistent-return */
import bcrypt from "bcrypt";

import User from "../db/models/UsersModel.js";

const create_new_user = async (req, res, next) => {
  try {
    // check if user email or username already exists
    const userExists = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "A user with this email or username is already registered.",
      });
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });

    await newUser.save();

    const { _id, email, username } = newUser;

    const token = newUser.createToken();

    return res
      .set("x-authorization-token", token)
      .json({ _id, email, username });
  } catch (e) {
    next(e);
  }
};

export { create_new_user };
