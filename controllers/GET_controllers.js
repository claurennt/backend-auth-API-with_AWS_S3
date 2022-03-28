import User from "../db/models/UsersModel.js";

// eslint-disable-next-line consistent-return
const get_all_users = async (req, res) => {
  const users = await User.find({ role: "user" });
  return users
    ? res.status(200).json(users)
    : res.status(404).send("No users found");
};

//sends information about the current user, coming from the authorizeUser middleware
const get_self = (req, res) => res.status(200).send(req.currentUser);

export { get_all_users, get_self };
