"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.allUserCategoriesService = exports.createCategoryService = void 0;
const Category_1 = require("../models/Category");
const errorUtils_1 = require("../utils/errorUtils");
const createCategoryService = async (data) => {
    const { userId, name, type, subCategories } = data;
    const categoryExist = await Category_1.Category.findOne({ userId, name });
    console.log("existing category", categoryExist);
    if (categoryExist) {
        throw (0, errorUtils_1.createCustomError)("category exist", `category with name=${name} already Exist!`, 400);
    }
    const newCategory = await Category_1.Category.create({
        userId,
        name,
        type,
        subCategories,
    });
    return newCategory;
};
exports.createCategoryService = createCategoryService;
const allUserCategoriesService = async (userId) => {
    const categories = await Category_1.Category.find({ userId });
    if (!categories || categories.length <= 0) {
        throw (0, errorUtils_1.createCustomError)("No Categories", "No categories Found!", 404);
    }
    return categories;
};
exports.allUserCategoriesService = allUserCategoriesService;
const updateCategoryService = async (catId, data) => {
    const { userId, name, type, subCategories } = data;
    const categoryExist = await Category_1.Category.findById(catId);
    const userCategory = await Category_1.Category.findOne({ userId, _id: catId });
    if (!categoryExist) {
        throw (0, errorUtils_1.createCustomError)("noCategoryExist", "No Category Found!", 404);
    }
    if (!userCategory) {
        throw (0, errorUtils_1.createCustomError)("noCategoryOwnership", "Not Allowed To Update Category!", 403);
    }
    categoryExist.name = name || categoryExist.name;
    categoryExist.type = type || categoryExist.type;
    categoryExist.subCategories = subCategories || categoryExist.subCategories;
    const updatedCategory = await categoryExist.save();
    return updatedCategory;
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (userId, catId) => {
    const catExist = await Category_1.Category.findOneAndDelete({ userId, _id: catId });
    if (!catExist) {
        throw (0, errorUtils_1.createCustomError)("noCategoryFound", `No Category Found With Id=${catId}`, 404);
    }
    return {
        message: "Account Deleted Successfully!",
        catId
    };
};
exports.deleteCategoryService = deleteCategoryService;
