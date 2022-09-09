import User from "../models/User.js";

import bcrypt from "bcrypt";

// eslint-disable-next-line consistent-return
const get_all_users = async (req, res) => {
  const users = await User.find();

  return users.length
    ? res.status(200).json(users)
    : res.status(404).send("No users found");
};

//sends information about the current user, coming from the authorizeUser middleware
const get_self = (req, res) => res.status(200).send(req.currentUser);

const delete_users = async (req, res, next) => {
  try {
    const { deletedCount } = await User.deleteMany();
    return res
      .status(200)
      .send(
        `You have successfully deleted ${deletedCount} users from your database.`
      );
  } catch (err) {
    next(err);
  }
};

//creates a new user
const create_new_user = async (req, res, next) => {
  try {
    //grab url from uploaded file on S3
    const { location } = req.file;
    const { data } = req.body;
    const { username, email, password, role } = JSON.parse(data);

    //block request is fields are missing
    if (!username || !email || !password || !location)
      return res.status(400).json({
        message: "Bad request, please provide username, email and password",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role && role,
      profile_pic: location,
    });

    await newUser.save();

    const { _id } = newUser;

    const token = newUser.createToken();

    return res
      .status(201)
      .set("x-authorization-token", token)
      .json({
        message: "Successfully created a new user",
        userRegistrationData: [{ _id, email, username, profile_pic: location }],
      });
  } catch (e) {
    next(e);
  }
};

const update_self = async (req, res, next) => {
  // retrieve the id

  const { _id } = req.currentUser;

  try {
    // check if the user provided a body that will be used to perform the update
    const condition = Object.entries(req.body);

    if (!condition.length)
      return res
        .status(400)
        .send(
          "Please provide a key/value pair of the field(s) you want to update"
        );
    console.log("hey");
    let [[key, value]] = condition;
    //block if the user is trying to change its role
    // if (condition.role && condition.role === "admin") {
    //   return res.status(401).send("You can't update the role");
    // }

    //hash the password if the user is updating the password
    if (key === "password") value = await bcrypt.hash(value, 10);

    const isUpdated = await User.findByIdAndUpdate(
      _id,
      { [key]: value },
      {
        new: true,
      }
    );
    console.log(isUpdated);
    return isUpdated
      ? res.status(200).send("User successfully updated")
      : res
          .status(404)
          .send("The user you are trying to update does not exist");
  } catch (err) {
    next(err);
  }
};

const delete_self = async (req, res, next) => {
  try {
    const { _id } = req.currentUser;

    const isDeleted = await User.findByIdAndDelete(_id);
    return isDeleted
      ? res.status(200).send("Successfully deleted user from the database")
      : res
          .status(404)
          .send("The user you are trying to delete does not exist");
  } catch (err) {
    next(err);
  }
};
export {
  delete_users,
  delete_self,
  get_all_users,
  get_self,
  update_self,
  create_new_user,
};
