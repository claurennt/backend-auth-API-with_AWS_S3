import User from "../db/models/UsersModel.js";

// eslint-disable-next-line consistent-return
const list_all_users = async (req, res) => {
  const users = await User.find({ role: "user" });
  return users
    ? res.status(200).json(users)
    : res.status(404).send("No users found");
};
export default list_all_users;
