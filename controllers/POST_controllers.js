/* eslint-disable consistent-return */
import bcrypt from "bcrypt";

import User from "../db/models/UsersModel.js";

//creates a new user
const create_new_user = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    //block request is fields are missing
    if (!username || !email || !password)
      return res.status(400).json({
        message: "Bad request, please provide username, email and password",
      });

    //block creation of an admin
    if (role === "admin")
      return res.status(403).send("You can't create an admin account");

    const newUser = new User({
      username,
      email,
      password: await bcrypt.hash(req.body.password, 10),
      role: role && role,
    });

    await newUser.save();
    const { _id } = newUser;

    const token = newUser.createToken();

    return res
      .status(201)
      .set("x-authorization-token", token)
      .json({
        message: "Successfully created a new user",
        userRegistrationData: [{ _id, email, username }],
      });
  } catch (e) {
    next(e);
  }
};

export { create_new_user };
