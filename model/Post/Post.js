const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post tile is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description tile is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Post category is required"],
    },
    numberOfViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    photo: {
      type: String,
      required: [true, "Post image is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//Hook middleware
postSchema.pre(/^find/, function (next) {
  //Add viewCount as virtual field
  postSchema.virtual("viewCount").get(function () {
    const post = this;

    return post.numberOfViews.length;
  });

  //Add likeCount as virtual field
  postSchema.virtual("likeCount").get(function () {
    const post = this;

    return post.likes.length;
  });

  //Add dislikeCount as virtual field
  postSchema.virtual("dislikeCount").get(function () {
    const post = this;

    return post.disLikes.length;
  });

  //Check the most liked post in percentage
  postSchema.virtual("likePercentage").get(function () {
    const post = this;

    //Convert post.likes.length and post.disLikes.length to number format
    const total = post.likes.length + post.disLikes.length;

    const percentage = (post.likes.length / total) * 100;

    if (isNaN(percentage)) {
      return `0 %`;
    } else {
      return `${percentage} %`;
    }
  });

  //Check the most disliked post in percentage
  postSchema.virtual("dislikePercentage").get(function () {
    const post = this;

    //Convert post.likes.length and post.disLikes.length to number format
    const total = Number(post.likes.length) + Number(post.disLikes.length);

    const percentage = (post.disLikes.length / total) * 100;

    if (isNaN(percentage)) {
      return `0 %`;
    } else {
      return `${percentage} %`;
    }
  });

  //Add virtuals daysAgo to the schema to show when the post is created
  postSchema.virtual("daysAgo").get(function () {
    const post = this;
    const date = new Date(post?.createdAt);
    const daysAgo = Math.floor((Date.now() - date) / 86400000);

    if (daysAgo === 0) {
      return `Today`;
    } else if (daysAgo === 1) {
      return `Yesterday`;
    } else {
      return `${daysAgo} days ago`;
    }
  });

  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
