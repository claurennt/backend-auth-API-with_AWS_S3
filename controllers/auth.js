/* eslint-disable consistent-return */
import bcrypt from "bcrypt";
import User from "../models/User.js";

//login request handler
const authenticate_self = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Missing username or password");

  // allow selection of password field of user for bycrpyt comparison
  const user = await User.findOne({ username }).select("+password");

  if (!user)
    return res.status(401).send("A user with this username does not exist.");

  //check valifity of sent password against the password stored in the user document in the db
  const isPasswordSame = await bcrypt.compare(password, user.password);

  if (!isPasswordSame) return res.status(401).send("Invalid credentials");

  //creates a token and appends it to the headers
  const token = user.createToken();

  return res.set("x-authorization-token", token).send("Login was successfull");
};

export default authenticate_self;
