const express = require("express");
const commentRouter = express.Router();

const isLogin = require("../../middlewares/isLogin");

const {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} = require("../../controllers/comments/commentsController");

//POST: /api/v1/comments/:id -> create a comment
commentRouter.post("/:id", isLogin, createCommentController);

//PUT: /api/v1/comments/:id -> update a comment
commentRouter.put("/:id", isLogin, updateCommentController);

//DELETE: /api/v1/comments/:id -> delete a comment
commentRouter.delete("/:id", isLogin, deleteCommentController);

module.exports = commentRouter;
