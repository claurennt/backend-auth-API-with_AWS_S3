import User from "../db/models/UsersModel.js";
import bcrypt from "bcrypt";
const update_self = async (req, res, next) => {
  // retrieve the id
  const { _id } = req.currentUser;

  // check if the user provided a body that will be used to perform the update
  const condition = req.body;
  if (!condition)
    return res
      .status(400)
      .send(
        "Please provide a key/value pair of the field(s) you want to update"
      );

  //block if the user is trying to change its role
  if (condition.role && condition.role === "admin") {
    return res.status(401).send("You can't update the role");
  }

  //hash the password if the user is updating the password
  if (condition.password)
    condition.password = await bcrypt.hash(condition.password, 10);

  try {
    const isUpdated = await User.findByIdAndUpdate(
      _id,
      { $set: { ...condition } },
      {
        new: true,
      }
    );

    return isUpdated
      ? res.status(200).send("User successfully updated")
      : res
          .status(404)
          .send("The user you are trying to update does not exist");
  } catch (err) {
    next(err);
  }
};

export { update_self };
