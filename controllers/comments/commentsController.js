const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const Comment = require("../../model/Comment/Comment");

const appError = require("../../utils/appError");

const createCommentController = async (req, res, next) => {
  const { description } = req.body;
  try {
    //Find the post
    const post = await Post.findById(req.params.id);

    //create comment
    const comment = await Comment.create({
      post: post._id,
      description,
      user: req.userAuth,
    });
    //Push the comment to the post
    post.comments.push(comment._id);

    //Find the user
    const user = await User.findById(req.userAuth);

    //Push to user
    user.comments.push(comment._id);

    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    res.json({
      status: "Success",
      data: comment,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    //Find the comment
    const commentToDelete = await Comment.findById(req.params.id);

    if (!commentToDelete) {
      return next(appError("Comment not found"));
    }

    //Check if the comment belongs to the user
    if (commentToDelete.user.toString() !== req.userAuth.toString()) {
      return next(appError("Action not allowed", 403));
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      status: "Success",
      data: "Comment deleted successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const updateCommentController = async (req, res, next) => {
  const { description } = req.body;
  try {
    //Find the comment
    const commentToUpdate = await Comment.findById(req.params.id);

    if (!commentToUpdate) {
      return next(appError("Comment not found"));
    }

    //Check if the comment belongs to the user
    if (commentToUpdate.user.toString() !== req.userAuth.toString()) {
      return next(appError("Action not allowed", 403));
    }

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "Success",
      data: comment,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = {
  createCommentController,
  deleteCommentController,
  updateCommentController,
};
