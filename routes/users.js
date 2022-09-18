import express from "express";
const usersRouter = express.Router();

import authorizeUser from "../middlewares/authorizeUser.js";
import S3upload from "../middlewares/s3-imageUpload.js";
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

usersRouter
  .route("/register")
  .post(S3upload.single("profile_pic"), create_new_user);

usersRouter
  .route("/me")
  .get(authorizeUser, get_self)
  .patch(
    authorizeUser,
    S3upload.fields([
      { name: "profile_pic", maxCount: 1 },
      { name: "cover_pic", maxCount: 1 },
    ]),
    update_self
  )
  .delete(authorizeUser, delete_self);

export default usersRouter;
