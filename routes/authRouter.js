import express from "express";
const authRouter = express.Router();

import checkAdminToken from "../middlewares/checkAdminToken.js";
import authorizeUser from "../middlewares/authorizeUser.js";
import authenticate_user from "../controllers/auth/authenticate_user.js";
import { create_new_user } from "../controllers/create_new_user.js";
import list_all_users from "../controllers/list_all_users.js";
import delete_users from "../controllers/delete_users.js";
import { update_field_of_user } from "../controllers/update_field_of_user.js";

//routes
authRouter.route("/register").post(create_new_user);

authRouter.route("/login").post(authenticate_user);

authRouter
  .route("/")
  .get(checkAdminToken, list_all_users)
  .delete(checkAdminToken, delete_users);

authRouter.get("/currentUser", authorizeUser);

authRouter.route("/:id").patch(authorizeUser, update_field_of_user);

export default authRouter;
