import User from "../models/User.js";

const checkUserExistence = async (req, res, next) => {
  try {
    /* check if user email or username already exists with information coming from the request*/
    if (
      req.method === "POST" ||
      //if the user is updating their credentials check if the username or email they want to use are already taken
      (req.method === "PATCH" && (req.body.username || req.body.email))
    ) {
      const userExists = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });

      if (userExists)
        return res
          .status(400)
          .send("A user with this email or username is already registered.");

      next();
    }
  } catch (err) {
    next(err);
  }
};

export default checkUserExistence;
