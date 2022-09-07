// here we create our schema and the  compile our schema into a model
import mongoose from "mongoose";

import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

// the schema is the blueprint of our  model
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

userSchema.methods.createToken = function () {
  /* payload= the part of the JWT where all the user data is actually added. 
   This data is also referred to as the 'claims' of the JWT.
   This information is readable by anyone so it is always advised 
   to not put any confidential information in here.*/
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    role: this.role,
  };

  //retrieve the secret key for the signing
  const { JWT_SECRET_KEY, JWT_ADMIN_KEY } = process.env;

  //signing a jwt with the data from the payload plus the jwt secret key, differenciate by user role
  const token =
    this.role === "admin"
      ? jwt.sign(payload, JWT_ADMIN_KEY)
      : jwt.sign(payload, JWT_SECRET_KEY);

  return token;
};
//create the model out of the imported schema
const User = mongoose.model("User", userSchema);

export default User;
