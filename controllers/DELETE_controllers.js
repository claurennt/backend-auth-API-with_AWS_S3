import User from "../db/models/UsersModel.js";

const delete_users = async (req, res, next) => {
  try {
    const condition = req.body;

    if (!condition) {
      return res
        .status(404)
        .send("Please provide a key/value pair to filter your query.");
    }
    const { deletedCount } = await User.deleteMany(condition);
    return res
      .status(200)
      .send(
        `You have successfully deleted ${deletedCount} users from your database.`
      );
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
export { delete_users, delete_self };
