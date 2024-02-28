const Category = require("../../model/Category/Category");
const appError = require("../../utils/appError");

//Create category
const createCategoryController = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.create({
      title,
      user: req.userAuth,
    });
    res.json({
      status: "Success",
      data: category,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//All categories
const fetchAllCategoryController = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "Success",
      data: categories,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//Get single category
const singleCategoryController = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "Success",
      data: category,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//delete a category
const deleteCategoryController = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "Success",
      data: "Delete category route",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

//update a category
const updateCategoryController = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "Success",
      data: category,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = {
  createCategoryController,
  singleCategoryController,
  deleteCategoryController,
  updateCategoryController,
  fetchAllCategoryController,
};
