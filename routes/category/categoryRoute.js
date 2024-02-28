const express = require("express");
const categoryRouter = express.Router();

const isLogin = require("../../middlewares/isLogin");

const {
  createCategoryController,
  singleCategoryController,
  deleteCategoryController,
  updateCategoryController,
  fetchAllCategoryController,
} = require("../../controllers/categories/categoriesController");

//POST: /api/v1/categories/ -> Create a new Category
categoryRouter.post("/", isLogin, createCategoryController);

//POST: /api/v1/categories/:id -> Get a single Category
categoryRouter.get("/:id", singleCategoryController);

//DELETE: /api/v1/categories/:id -> Delete a single Category
categoryRouter.delete("/:id", isLogin, deleteCategoryController);

//PUT: /api/v1/categories/:id -> Update a single Category
categoryRouter.put("/:id", isLogin, updateCategoryController);

//PUT: /api/v1/categories -> Get all Categories
categoryRouter.get("/", fetchAllCategoryController);

module.exports = categoryRouter;
