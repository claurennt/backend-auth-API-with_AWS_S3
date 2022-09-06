import express from "express";
const usersRouter = express.Router();

import authorizeUser from "../middlewares/authorizeUser.js";
import checkUserExistence from "../middlewares/checkUserExistence.js";

import {
  get_all_users,
  get_self,
  delete_users,
  delete_self,
  update_self,
} from "../controllers/users.js";

//routes

usersRouter
  .route("/")
  .get(authorizeUser, get_all_users)
  .delete(authorizeUser, delete_users);

usersRouter
  .route("/me")
  .get(authorizeUser, get_self)
  .patch(authorizeUser, update_self)
  .delete(authorizeUser, delete_self);

export default usersRouter;
