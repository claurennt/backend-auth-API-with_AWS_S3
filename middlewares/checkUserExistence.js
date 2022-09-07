import User from "../models/User.js";

const checkUserExistence = async (req, res, next) => {
  try {
    /* check if user email or username already exists with information coming from the request*/

    const userExists = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    console.log(userExists);
    if (userExists)
      return res
        .status(400)
        .send("A user with this email or username is already registered.");

    next();
  } catch (err) {
    next(err);
  }
};

export default checkUserExistence;
