const express = require("express");
const multer = require("multer");

const userRouter = express.Router();

const storage = require("../../config/cloudinary");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const {
  adminBlockUserController,
  adminUnBlockUserController,
  blockUsersController,
  deleteUserController,
  followingController,
  profilePhotoUploadController,
  unBlockUsersController,
  unFollowController,
  updatePasswordController,
  userLoginController,
  userProfileController,
  userRegisterController,
  usersController,
  updateUserController,
  whoViewedMyProfile,
} = require("../../controllers/users/userController");

//Instance of multer
const upload = multer({ storage });

//POST: /api/v1/users/register -> register a new user
userRouter.post("/register", userRegisterController);

//POST: /api/v1/users/login -> login an existing user
userRouter.post("/login", userLoginController);

//GET: /api/v1/users/profile -> get the logged in user's profile
userRouter.get("/profile", isLogin, userProfileController);

//GET: /api/v1/users/profile-viewers/:id ->  Get all viewers of a specific user's profile
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfile);

//GET: /api/v1/users/following/:id ->  Get following
userRouter.get("/following/:id", isLogin, followingController);

//GET: /api/v1/users/unfollow/:id ->  Get unfollowing
userRouter.get("/unfollow/:id", isLogin, unFollowController);

//GET: /api/v1/users/blocked/:id ->  Get blocked users (within users)
userRouter.get("/blocked/:id", isLogin, blockUsersController);

//GET: /api/v1/users/unblock/:id ->  Get unblock users (within users)
userRouter.get("/unblock/:id", isLogin, unBlockUsersController);

//PUT: /api/v1/users/admin-block/:id ->  Get block users (admin)
userRouter.put("/admin-block/:id", isLogin, isAdmin, adminBlockUserController);

//PUT: /api/v1/users/admin-unblock/:id ->  Get block users (admin)
userRouter.put(
  "/admin-unblock/:id",
  isLogin,
  isAdmin,
  adminUnBlockUserController
);

//GET: /api/v1/users -> get all users
userRouter.get("/", usersController);

//DELETE: /api/v1/users/delete-account -> delete user's account
userRouter.delete("/delete-account", isLogin, deleteUserController);

//PUT: /api/v1/users -> Update User's Information
userRouter.put("/", isLogin, updateUserController);

//PUT: /api/v1/users/update-passwor -> Update User's password
userRouter.put("/update-password", isLogin, updatePasswordController);

//POST: /api/v1/users/profile-photo-upload -> upload a profile photo
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadController
);

module.exports = userRouter;
