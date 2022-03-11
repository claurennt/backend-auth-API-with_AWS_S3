const express = require("express");
const authRouter = express.Router();

const checkAdminToken = require("../middlewares/authorizeAdmin");
const authorizeUser = require("../middlewares/authorizeUser");
const authenticate_user = require("../controllers/users_controllers/authenticate_user");
const {
  create_new_user,
} = require("../controllers/users_controllers/create_new_user");
const list_all_users = require("../controllers/users_controllers/list_all_users");
const {
  delete_users,
} = require("../controllers/users_controllers/delete_users");
const {
  update_field_of_user,
} = require("../controllers/users_controllers/update_field_of_user");

//routes
authRouter.route("/register").post(create_new_user);

authRouter.route("/login").post(authenticate_user);

authRouter
  .route("/")
  .get(checkAdminToken, list_all_users)
  .delete(checkAdminToken, delete_users);

authRouter.get("/currentUser", authorizeUser);

authRouter.route("/:id").patch(authorizeUser, update_field_of_user);

module.exports = authRouter;
