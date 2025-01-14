import { BudgetPayload, UpdateBudgetPayload } from "../../types";
import { Account } from "../models/Account";
import { Budget } from "../models/Budget";
import { Category } from "../models/Category";
import { createCustomError } from "../utils/errorUtils";

export const createBudgetService = async (data: BudgetPayload) => {
  const {
    name,
    description,
    userId,
    categoryId,
    amount,
    accountId,
    isGlobal,
    startDate,
    endDate,
  } = data;
  const category = await Category.findOne({ _id: categoryId, userId });
  if (!category) {
    throw createCustomError(
      "category_not_found",
      `Category with ID=${categoryId} does not exist or does not belong to the user.`,
      404
    );
  }

  const account = await Account.findOne({ _id: accountId, userId });
  if (!account) {
    throw createCustomError(
      "account_not_found",
      `Account with ID=${accountId} does not exist or does not belong to the user.`,
      404
    );
  }

  const newBudget = await Budget.create({
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

export const allBudgetsService = async (userId: string) => {
  const budgets = await Budget.find({ userId });
  if (!budgets || budgets.length <= 0) {
    throw createCustomError("No_budget_found", "No budgets Found!", 404);
  }
  const analysis = budgets.map((budget) => {
    const remaining = budget.amount - budget.spent;
    return {
      _id: budget._id,
      name:budget.name,
      description:budget.description,
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

export const updateBudgetService = async (
  budgetId: string,
  data: UpdateBudgetPayload
) => {
  const {
    name,
    description,
    userId,
    categoryId,
    amount,
    accountId,
    isGlobal,
    startDate,
    endDate,
  } = data;
  const budget = await Budget.findOne({ _id: budgetId, userId });

  if (!budget) {
    throw createCustomError(
      "budget_not_found",
      `Budget with ID=${budgetId} does not exist or does not belong to the user.`,
      404
    );
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

export const updateSpendingBudgetService = async (
  budgetId: string,
  userId: string,
  spentAmount: number
) => {
  const budget = await Budget.findOne({ _id: budgetId, userId });
  if (!budget) {
    throw createCustomError(
      "budget_not_found",
      `Budget with ID=${budgetId} does not exist or does not belong to the user.`,
      404
    );
  }
  budget.spent += spentAmount;
  if (budget.spent > budget.amount) {
    throw createCustomError(
      "budget_over_spent",
      "Amount spent exceeds the total budgeted amount.",
      400
    );
  }
  await budget.save();
};

export const deleteBudgetService = async (userId: string, budgetId: string) => {
  const budgetExist = await Budget.findOneAndDelete({ _id: budgetId, userId });
  if (!budgetExist) {
    throw createCustomError(
      "noBudgetFound",
      `No Budget Found With Id=${budgetId}`,
      404
    );
  }
  return {
    message: "Budget Deleted Successfully!",
    budgetId,
  };
};
