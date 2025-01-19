"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAlluserCategories = exports.createCategory = void 0;
const category_service_1 = require("../services/category.service");
const createCategory = async (req, res, next) => {
    const userId = req.user?._id;
    const { name, subCategories, type } = req.body;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const catPayload = {
            userId,
            name,
            subCategories,
            type,
        };
        const newCategory = await (0, category_service_1.createCategoryService)(catPayload);
        return res
            .status(201)
            .json({ message: "Category created Successfully!", newCategory });
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const getAlluserCategories = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User Must be Logged In!" });
        }
        const allCategories = await (0, category_service_1.allUserCategoriesService)(userId);
        return res.status(200).json(allCategories);
    }
    catch (error) {
        next(error);
    }
};
exports.getAlluserCategories = getAlluserCategories;
const updateCategory = async (req, res, next) => {
    const userId = req.user?._id;
    const catId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be LoggedIn" });
        }
        const dataPayload = {
            ...req.body,
            userId,
        };
        const updatedCategory = await (0, category_service_1.updateCategoryService)(catId, dataPayload);
        return res
            .status(200)
            .json({ message: "Category Updated Successfully!", updatedCategory });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    const userId = req.user?._id;
    const catId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const result = await (0, category_service_1.deleteCategoryService)(userId, catId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
