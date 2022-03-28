/* eslint-disable consistent-return */
import bcrypt from "bcrypt";

import User from "../db/models/UsersModel.js";

//creates a new user
const create_new_user = async (req, res, next) => {
  try {
    //block request is fields are missing
    if (!req.body.username || !req.body.email || !req.body.password)
      return res.status(400).json({
        message: "Bad request, please provide username, email and password",
      });

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    await newUser.save();

    const { _id, email, username } = newUser;

    const token = newUser.createToken();

    return res
      .status(201)
      .set("x-authorization-token", token)
      .json({ _id, email, username });
  } catch (e) {
    next(e);
  }
};

export { create_new_user };
