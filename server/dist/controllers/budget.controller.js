"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.updateSpendingBudget = exports.updateBudget = exports.getAllBudgets = exports.createBudget = void 0;
const budget_service_1 = require("../services/budget.service");
const createBudget = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const data = {
            ...req.body,
            userId,
        };
        const newBudget = await (0, budget_service_1.createBudgetService)(data);
        return res
            .status(201)
            .json({ message: "Budget Created SuccessFully", newBudget });
    }
    catch (error) {
        next(error);
    }
};
exports.createBudget = createBudget;
const getAllBudgets = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User Must be Logged In!" });
        }
        const allBudgets = await (0, budget_service_1.allBudgetsService)(userId);
        return res.status(200).json(allBudgets);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBudgets = getAllBudgets;
const updateBudget = async (req, res, next) => {
    const userId = req.user?._id;
    const budgetId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User Must be Logged In!" });
        }
        const budgetData = {
            ...req.body,
            userId,
        };
        const updatedBudget = await (0, budget_service_1.updateBudgetService)(budgetId, budgetData);
        return res.status(200).json({ message: "budget updated successfuly", updatedBudget });
    }
    catch (error) {
        next(error);
    }
};
exports.updateBudget = updateBudget;
const updateSpendingBudget = async (req, res, next) => {
    const userId = req.user?._id;
    const budgetId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User Must be Logged In!" });
        }
        const { spentAmount } = req.body;
        const updatedSpending = await (0, budget_service_1.updateSpendingBudgetService)(budgetId, userId, spentAmount);
        return res.status(200).json({ message: "spending updated Successfully!", updatedSpending });
    }
    catch (error) {
        next(error);
    }
};
exports.updateSpendingBudget = updateSpendingBudget;
const deleteBudget = async (req, res, next) => {
    const userId = req.user?._id;
    const budgetId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const result = await (0, budget_service_1.deleteBudgetService)(userId, budgetId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBudget = deleteBudget;
