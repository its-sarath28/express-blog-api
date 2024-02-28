const mongoose = require("mongoose");
const Post = require("../Post/Post");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // plan: {
    //   type: String,
    //   enum: ["Free", "Premium", "Pro"],
    //   default: "Free",
    // },
    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, //to get virtuals in JSON  response from server to client
  }
);

//Hooks
//Pre-before record is saved
userSchema.pre("findOne", async function (next) {
  //Populate the post
  this.populate("posts");

  //Get the user Id
  const userId = this._conditions._id;

  //Find the post created by the user
  const posts = await Post.find({ user: userId });

  //Get the last post created by the user
  const lastPost = posts[posts.length - 1];

  //get last post date
  const lastPostDate = new Date(lastPost?.createdAt);

  //get lastPostDate in string format
  const lastPostDateString = lastPostDate.toDateString();

  //add virtuals to schema
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateString;
  });

  //<---Check if a user is inactive for 30 days--->
  //Get current date
  const currentDate = new Date();

  //Get the difference between lastPostDate and currentDate
  const diff = currentDate - lastPostDate;

  //Convert the diff into number of days
  const diffInDays = diff / (1000 * 3600 * 24);

  if (diffInDays > 30) {
    //Add virtuals isInactive to the schema to check if a user is inactive for 30 days
    userSchema.virtual("isInactive").get(function () {
      return true;
    });

    //Find the user by ID and update
    // await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     isBlocked: true,
    //   },
    //   {
    //     new: true,
    //   }
    // );
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });
    //Find the user by ID and update
    // await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     isBlocked: false,
    //   },
    //   {
    //     new: true,
    //   }
    // );
  }

  //<---Last active date--->
  //Convert to 'n' days ago
  const daysAgo = Math.floor(diffInDays);

  //Add virtuals lastActive to the schema to show the last active day of the user
  userSchema.virtual("lastActive").get(function () {
    if (daysAgo <= 0) {
      return "Today";
    }

    if (daysAgo === 1) {
      return "Yesterday";
    }

    if (daysAgo > 1) {
      return `${daysAgo} days ago`;
    }
  });

  //<---Update user award on the number of posts--->
  //Get the number of posts
  const numberOfPost = posts.length;

  //Check if the number of posts is less than 10
  if (numberOfPost < 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Bronze",
      },
      {
        new: true,
      }
    );
  }

  //Check if the number of posts is greater than 10
  if (numberOfPost > 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Silver",
      },
      {
        new: true,
      }
    );
  }

  //Check if the number of posts is greater than 20
  if (numberOfPost > 20) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Gold",
      },
      {
        new: true,
      }
    );
  }

  next();
});

//Get full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

//Get user initials
userSchema.virtual("initials").get(function () {
  return `${this.firstName[0]}${this.lastName[0]}`;
});

//Get post count
userSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

//Get followers count
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

//Get following count
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

//Get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

//Get blocked count
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
