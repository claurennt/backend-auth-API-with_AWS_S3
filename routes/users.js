import express from "express";
const usersRouter = express.Router();

import authorizeUser from "../middlewares/authorizeUser.js";

import {
  get_all_users,
  get_self,
  delete_users,
  delete_self,
  create_new_user,
  update_self,
} from "../controllers/users.js";

import checkUserExistence from "../middlewares/checkUserExistence.js";
//routes

usersRouter
  .route("/")
  .get(authorizeUser, get_all_users)
  .delete(authorizeUser, delete_users);

usersRouter.route("/register").post(create_new_user);

usersRouter
  .route("/me")
  .get(authorizeUser, get_self)
  .patch(authorizeUser, update_self)
  .delete(authorizeUser, delete_self);

export default usersRouter;
