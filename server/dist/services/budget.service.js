"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudgetService = exports.updateSpendingBudgetService = exports.updateBudgetService = exports.allBudgetsService = exports.createBudgetService = void 0;
const Account_1 = require("../models/Account");
const Budget_1 = require("../models/Budget");
const Category_1 = require("../models/Category");
const errorUtils_1 = require("../utils/errorUtils");
const createBudgetService = async (data) => {
    const { name, description, userId, categoryId, amount, accountId, isGlobal, startDate, endDate, } = data;
    const category = await Category_1.Category.findOne({ _id: categoryId, userId });
    if (!category) {
        throw (0, errorUtils_1.createCustomError)("category_not_found", `Category with ID=${categoryId} does not exist or does not belong to the user.`, 404);
    }
    const account = await Account_1.Account.findOne({ _id: accountId, userId });
    if (!account) {
        throw (0, errorUtils_1.createCustomError)("account_not_found", `Account with ID=${accountId} does not exist or does not belong to the user.`, 404);
    }
    const newBudget = await Budget_1.Budget.create({
        name,
        description,
        userId,
        categoryId,
        amount,
        accountId,
        isGlobal,
        startDate,
        endDate,
    });
    return newBudget;
};
exports.createBudgetService = createBudgetService;
const allBudgetsService = async (userId) => {
    const budgets = await Budget_1.Budget.find({ userId });
    if (!budgets || budgets.length <= 0) {
        throw (0, errorUtils_1.createCustomError)("No_budget_found", "No budgets Found!", 404);
    }
    const analysis = budgets.map((budget) => {
        const remaining = budget.amount - budget.spent;
        return {
            _id: budget._id,
            name: budget.name,
            description: budget.description,
            category: budget.categoryId,
            account: budget.accountId,
            isGlobal: budget.isGlobal,
            amount: budget.amount,
            spent: budget.spent,
            remaining,
            startDate: budget.startDate,
            endDate: budget.endDate,
        };
    });
    return analysis;
};
exports.allBudgetsService = allBudgetsService;
const updateBudgetService = async (budgetId, data) => {
    const { name, description, userId, categoryId, amount, accountId, isGlobal, startDate, endDate, } = data;
    const budget = await Budget_1.Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
        throw (0, errorUtils_1.createCustomError)("budget_not_found", `Budget with ID=${budgetId} does not exist or does not belong to the user.`, 404);
    }
    budget.name = name || budget.name;
    budget.description = description || budget.description;
    budget.categoryId = categoryId || budget.categoryId;
    budget.amount = amount || budget.amount;
    budget.accountId = accountId || budget.accountId;
    budget.isGlobal = isGlobal || budget.isGlobal;
    budget.startDate = startDate || budget.startDate;
    budget.endDate = endDate || budget.endDate;
    const updatedBudget = await budget.save();
    return updatedBudget;
};
exports.updateBudgetService = updateBudgetService;
const updateSpendingBudgetService = async (budgetId, userId, spentAmount) => {
    const budget = await Budget_1.Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
        throw (0, errorUtils_1.createCustomError)("budget_not_found", `Budget with ID=${budgetId} does not exist or does not belong to the user.`, 404);
    }
    budget.spent += spentAmount;
    if (budget.spent > budget.amount) {
        throw (0, errorUtils_1.createCustomError)("budget_over_spent", "Amount spent exceeds the total budgeted amount.", 400);
    }
    await budget.save();
};
exports.updateSpendingBudgetService = updateSpendingBudgetService;
const deleteBudgetService = async (userId, budgetId) => {
    const budgetExist = await Budget_1.Budget.findOneAndDelete({ _id: budgetId, userId });
    if (!budgetExist) {
        throw (0, errorUtils_1.createCustomError)("noBudgetFound", `No Budget Found With Id=${budgetId}`, 404);
    }
    return {
        message: "Budget Deleted Successfully!",
        budgetId,
    };
};
exports.deleteBudgetService = deleteBudgetService;
