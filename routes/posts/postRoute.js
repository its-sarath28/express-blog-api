const express = require("express");
const multer = require("multer");
const postRouter = express.Router();

const storage = require("../../config/cloudinary");

const isLogin = require("../../middlewares/isLogin");

const {
  createPostController,
  singlePostController,
  fetchAllPostController,
  deletePostController,
  updatePostController,
  togggleLikeController,
  togggleDislikeController,
} = require("../../controllers/posts/postController");

//File upload middleware
const upload = multer({ storage });

//POST: /api/v1/posts/ -> create a post
postRouter.post("/", isLogin, upload.single("image"), createPostController);

//GET: /api/v1/posts/:id -> Get a single post
postRouter.get("/:id", isLogin, singlePostController);

//GET: /api/v1/posts/likes/:id -> Like a post
postRouter.get("/likes/:id", isLogin, togggleLikeController);

//GET: /api/v1/posts/dislikes/:id -> Like a post
postRouter.get("/dislikes/:id", isLogin, togggleDislikeController);

//GET: /api/v1/posts/ -> Get all posts
postRouter.get("/", isLogin, fetchAllPostController);

//DELETE: /api/v1/posts/:id -> Delete a post
postRouter.delete("/:id", isLogin, deletePostController);

//PUT: /api/v1/posts/:id -> Update a post
postRouter.put("/:id", isLogin, upload.single("image"), updatePostController);

module.exports = postRouter;
