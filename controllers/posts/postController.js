const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

const appError = require("../../utils/appError");

//Create Post
const createPostController = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //Find the user
    const author = await User.findById(req.userAuth);

    //Check if the user is blocked
    if (author.isBlocked) {
      return next(appError("Access denied , account blocked!", 403));
    }

    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req?.file?.path,
    });

    //Associate user to a post & Push the post to the user's post field
    author.posts.push(postCreated);

    //save
    await author.save();
    res.json({
      status: "Success",
      data: postCreated,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Single post details
const singlePostController = async (req, res, next) => {
  try {
    //Find the post
    const post = await Post.findById(req.params.id);

    //Number of views
    //Check if user has viewed the post
    const isViewed = post.numberOfViews.includes(req.userAuth);

    if (isViewed) {
      //If viewed return the post
      res.json({
        status: "Success",
        data: post,
      });
    } else {
      //If not viewed, push the user to numberOfViews
      post.numberOfViews.push(req.userAuth);
      await post.save();

      res.json({
        status: "Success",
        data: post,
      });
    }
  } catch (err) {
    next(appError(err.message));
  }
};

//Fetch All Post
const fetchAllPostController = async (req, res, next) => {
  try {
    //Find all posts
    const posts = await Post.find({})
      .populate("user")
      .populate("category", "title");

    //Check if the user is blocked by the post owner
    const filteredPosts = posts.filter((post) => {
      //Get all blocked users
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuth);

      // return isBlocked ? null : post;
      return !isBlocked;
    });
    res.json({
      status: "Success",
      data: filteredPosts,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Toggle likes
const togggleLikeController = async (req, res, next) => {
  try {
    //Get the post
    const post = await Post.findById(req.params.id);

    //Check if the user have already liked the post
    const isLiked = post.likes.includes(req.userAuth);

    //If the user already liked the post, remove the like fom the post
    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      //If the user haven't liked the post, add like to the post
      post.likes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "Success",
      data: "You have liked the post",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Toggle dislikes
const togggleDislikeController = async (req, res, next) => {
  try {
    //Get the post
    const post = await Post.findById(req.params.id);

    //Check if the user have already disliked the post
    const isDisliked = post.disLikes.includes(req.userAuth);

    //If the user already disliked the post, remove the dislike fom the post
    if (isDisliked) {
      post.disLikes = post.disLikes.filter(
        (dislike) => dislike.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      //If the user haven't disliked the post, add dislike to the post
      post.disLikes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "Success",
      data: "You have disliked the post",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Delete a Post
const deletePostController = async (req, res, next) => {
  try {
    //Find the post
    const postToDelete = await Post.findById(req.params.id);

    if (!postToDelete) {
      return next(appError("Post not found"));
    }

    //Check if the post belongs to the user
    if (postToDelete.user.toString() !== req.userAuth.toString()) {
      return next(appError("Action not allowed", 403));
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      status: "Success",
      data: "Post deleted successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Update a Post
const updatePostController = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //Find the post
    const postToUpdate = await Post.findById(req.params.id);

    if (!postToUpdate) {
      return next(appError("Post not found"));
    }

    //Check if the post belongs to the user
    if (postToUpdate.user.toString() !== req.userAuth.toString()) {
      return next(appError("Action not allowed", 403));
    }

    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req?.file?.path,
      },
      {
        new: true,
      }
    );

    res.json({
      status: "Success",
      data: "Post updated successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = {
  createPostController,
  singlePostController,
  fetchAllPostController,
  deletePostController,
  updatePostController,
  togggleLikeController,
  togggleDislikeController,
};
