/* eslint-disable consistent-return */
import bcrypt from "bcrypt";
import User from "../../db/models/UsersModel.js";

const authenticate_self = async (req, res) => {
  const { username, password } = req.body;

  // allow selection of password field of user for bycrpyt comparison
  const user = await User.findOne({ username }).select("+password");

  if (!user)
    return res.status(401).send("A user with this email does not exist.");

  const isPasswordSame = await bcrypt.compare(password, user.password);

  if (!isPasswordSame) return res.status(401).send("Invalid credentials");

  const token = user.createToken();

  return res.set("x-authorization-token", token).send("Login was successfull");
};

export default authenticate_self;
