import express from "express";
const authRouter = express.Router();

import authenticate_self from "../controllers/auth/authenticate_self.js";

import { create_new_user } from "../controllers/POST_controllers.js";

import checkUserExistence from "../middlewares/checkUserExistence.js";

authRouter.route("/register").post(checkUserExistence, create_new_user);

authRouter.route("/login").post(authenticate_self);

export default authRouter;
