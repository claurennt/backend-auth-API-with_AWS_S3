import express from "express";
const usersRouter = express.Router();

import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import authorizeUser from "../middlewares/authorizeUser.js";
import checkUserExistence from "../middlewares/checkUserExistence.js";
import { get_all_users, get_self } from "../controllers/GET_controllers.js";
import {
  delete_users,
  delete_self,
} from "../controllers/DELETE_controllers.js";
import { update_self } from "../controllers/PATCH_controllers.js";

//routes

usersRouter
  .route("/")
  .get(authorizeAdmin, get_all_users)
  .delete(authorizeAdmin, delete_users);

usersRouter
  .route("/me")
  .get(authorizeUser, get_self)
  .patch(authorizeUser, checkUserExistence, update_self)
  .delete(authorizeUser, delete_self);

export default usersRouter;
