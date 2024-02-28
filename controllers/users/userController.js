const bcrypt = require("bcryptjs");

const appError = require("../../utils/appError");
const generateToken = require("../../utils/generateToken");

const User = require("../../model/User/User");
const Post = require("../../model/Post/Post");
const Comment = require("../../model/Comment/Comment");
const Category = require("../../model/Category/Category");

//Register
const userRegisterController = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appError("Email already exists !", 500));
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
      firstName,
      lastName,
      //profilePhoto,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Login
const userLoginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Checking the email & password
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return next(appError("Invalid credentials"));
    }

    //Verify password
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch) {
      return next(appError("Invalid credentials"));
    }

    res.json({
      status: "Success",
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//User profile
const userProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.json(err.message);
  }
};

//Who viewed my profile
const whoViewedMyProfile = async (req, res, next) => {
  try {
    //Find the original user
    const user = await User.findById(req.params.id);

    //Find user who viewed original user
    const userWhoViewed = await User.findById(req.userAuth);

    //Check if original user & whoViewed are found
    if (user && userWhoViewed) {
      //Check if userWhoViewed id already in the user's viewers array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );

      if (isUserAlreadyViewed) {
        return next(appError("You already viewed this profile"));
      } else {
        //Push the userWhoViewed to the user's viewers array
        user.viewers.push(userWhoViewed._id);

        //save the user
        await user.save();
        res.json({
          status: "Success",
          data: "You've successfully viewed this profile",
        });
      }
    }
  } catch (err) {
    next(appError(err.message));
  }
};

//Following
const followingController = async (req, res, next) => {
  try {
    //Find the user to follow
    const userToFollow = await User.findById(req.params.id);

    //Find the user who is following
    const userWhoFollowed = await User.findById(req.userAuth);

    //Check if userToFollow and userWhoFollowed are found
    if (userToFollow && userWhoFollowed) {
      //Check if userWhoFollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToFollow.followers.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );

      if (isUserAlreadyFollowed) {
        return next(appError("You already followed this user"));
      } else {
        //Push userWhoFollowed into the user's followers array
        userToFollow.followers.push(userWhoFollowed._id);

        //Push userToFollow into the user's following array
        userWhoFollowed.following.push(userToFollow._id);

        //save
        await userWhoFollowed.save();
        await userToFollow.save();

        res.json({
          status: "Success",
          data: "You've successfully followed this user",
        });
      }
    }
  } catch (err) {
    next(appError(err.message));
  }
};

//Unfollow
const unFollowController = async (req, res, next) => {
  try {
    //Find the user to unfollow
    const userToBeUnfollowed = await User.findById(req.params.id);

    //Find the user who is unfollowing
    const userWhoUnfollowed = await User.findById(req.userAuth);

    //Check if userToBeUnfollowed and userWhoUnfollowed are found
    if (userToBeUnfollowed && userWhoUnfollowed) {
      //Check if userWhoUnfollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
        (follower) => follower.toString() === userWhoUnfollowed._id.toString()
      );

      if (!isUserAlreadyFollowed) {
        return next(appError("You already unfollowed this user"));
      } else {
        //Remove userWhoUnfollowed from the user's followers array
        userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
          (follower) => follower.toString() !== userWhoUnfollowed._id.toString()
        );

        //save
        await userToBeUnfollowed.save();

        //Remove userToBeUnfollowed from the user's following array
        userWhoUnfollowed.following = userWhoUnfollowed.following.filter(
          (following) =>
            following.toString() !== userToBeUnfollowed._id.toString()
        );

        //save
        await userWhoUnfollowed.save();

        res.json({
          status: "Success",
          data: "You've successfully unfollowed this user",
        });
      }
    }
  } catch (err) {
    next(appError(err.message));
  }
};

//Block users (within users)
const blockUsersController = async (req, res, next) => {
  try {
    //Find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);

    //Find the user who is blocking
    const userWhoBlocked = await User.findById(req.userAuth);

    //Check if userToBeBlocked and userWhoBlocked are found
    if (userToBeBlocked && userWhoBlocked) {
      //Check if userWhoBlocked is already in the user's blocked array
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );

      if (isUserAlreadyBlocked) {
        return next(appError("You already blocked this user"));
      } else {
        //Push userToBeBlocked into the userWhoBlocked's block array
        userWhoBlocked.blocked.push(userToBeBlocked._id);

        //save
        await userWhoBlocked.save();

        res.json({
          status: "Success",
          data: "You've successfully blocked this user",
        });
      }
    }
  } catch (err) {
    next(appError(err.message));
  }
};

//Unblock users (within users)
const unBlockUsersController = async (req, res, next) => {
  try {
    //Find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params.id);

    //Find the user who is unblocking
    const userWhoUnBlocked = await User.findById(req.userAuth);

    //Check if userToBeUnBlocked and userWhoUnBlocked are found
    if (userToBeUnBlocked && userWhoUnBlocked) {
      //Check if userToBeUnBlocked is already in the userWhoUnBlocked's blocked array
      const isUserAlreadyUnBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );

      if (!isUserAlreadyUnBlocked) {
        return next(appError("You haven't blocked this user"));
      } else {
        //Remove userToBeUnBlocked into the main user's block array
        userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
          (blocked) => blocked.toString() !== userToBeUnBlocked._id.toString()
        );

        //save
        await userWhoUnBlocked.save();

        res.json({
          status: "Success",
          data: "You've successfully unblocked this user",
        });
      }
    }
  } catch (err) {
    next(appError(err.message));
  }
};

//Admin block
const adminBlockUserController = async (req, res, next) => {
  try {
    //Find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);

    //Check if userToBeBlocked is found
    if (!userToBeBlocked) {
      return next(appError("No user found !"));
    }

    //Send a message if the user is already blocked
    if (userToBeBlocked.isBlocked) {
      return res.json({
        status: "Success",
        data: "You've already blocked this user",
      });
    }

    //Change the isBlocked field to true
    userToBeBlocked.isBlocked = true;

    //save
    await userToBeBlocked.save();

    res.json({
      status: "Success",
      data: "You've successfully blocked this user",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Admin unblock
const adminUnBlockUserController = async (req, res, next) => {
  try {
    //Find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params.id);

    //Check if userToBeUnBlocked is found
    if (!userToBeUnBlocked) {
      return next(appError("No user found !"));
    }

    //Send a message if the user is already unblocked
    if (!userToBeUnBlocked.isBlocked) {
      return res.json({
        status: "Success",
        data: "You've already unblocked this user",
      });
    }

    //Change the isBlocked field to false
    userToBeUnBlocked.isBlocked = false;

    //save
    await userToBeUnBlocked.save();

    res.json({
      status: "Success",
      data: "You've successfully unblocked this user",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Get all users
const usersController = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.json({
      status: "Success",
      data: allUsers,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Delete user
const deleteUserController = async (req, res, next) => {
  try {
    //Find the user to be deleted
    const userTobeDeleted = await User.findById(req.userAuth);

    if (!userTobeDeleted) {
      return next(appError("No user found !"));
    }

    //Find all posts to be deleted
    await Post.deleteMany({ user: req.userAuth });

    //Find all posts to be deleted
    await Comment.deleteMany({ user: req.userAuth });

    //Find all posts to be deleted
    await Category.deleteMany({ user: req.userAuth });

    //Delete the user
    await User.deleteOne(userTobeDeleted);
    res.json({
      status: "Success",
      data: "Your account has been deleted successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Update user
const updateUserController = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  try {
    //Check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appError("Email already taken", 404));
      }
    }

    //Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.userAuth,
      {
        firstName,
        lastName,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    //Send response
    res.json({
      status: "Success",
      data: updatedUser,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Update password
const updatePasswordController = async (req, res, next) => {
  const { password } = req.body;
  try {
    //Check if the user is updating the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Update the password in the database
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.json({
        status: "Success",
        data: "Password changed successfully",
      });
    } else {
      return next(appError("Please provide password field"));
    }
  } catch (err) {
    next(appError(err.message));
  }
};

//Update user profile photo
const profilePhotoUploadController = async (req, res, next) => {
  try {
    //Find the user to update
    const userToUpdate = await User.findById(req.userAuth);

    //Check if user found
    if (!userToUpdate) {
      return next(appError("User not found", 404));
    }

    //Check if user is blocked or not
    if (userToUpdate.isBlocked) {
      return next(appError("Action not allowed, Your account is blocked", 403));
    }

    //Check if a user is updating the profile photo
    if (req.file) {
      //Update profile photo
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: "Success",
        data: "Profile photo uploaded successfully",
      });
    }
  } catch (err) {
    next(appError(err.message, 500));
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  userProfileController,
  whoViewedMyProfile,
  usersController,
  deleteUserController,
  updateUserController,
  profilePhotoUploadController,
  followingController,
  unFollowController,
  blockUsersController,
  unBlockUsersController,
  adminBlockUserController,
  adminUnBlockUserController,
  updatePasswordController,
};
