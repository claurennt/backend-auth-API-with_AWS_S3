import express from "express";
const authRouter = express.Router();

import authenticate_self from "../controllers/auth.js";

authRouter.route("/login").post(authenticate_self);

export default authRouter;
