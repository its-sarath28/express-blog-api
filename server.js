const express = require("express");

require("dotenv").config();
require("./config/dbConnect");

const globalErrorHandler = require("./middlewares/globalErrorHandler");

const userRouter = require("./routes/user/userRoute");
const postRouter = require("./routes/posts/postRoute");
const commentRouter = require("./routes/comments/commentRoute");
const categoryRouter = require("./routes/category/categoryRoute");

const app = express();

//middlewares
app.use(express.json());

//Routes
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/categories", categoryRouter);

//Error handlers middleware
app.use(globalErrorHandler);

//404 Error
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} - File not found`,
  });
});

//App listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

//9:41
