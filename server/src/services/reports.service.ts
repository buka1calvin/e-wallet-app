import { Budget } from "../models/Budget";
import { Transaction } from "../models/Transaction";

export const generateReport = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  // 1. Aggregate total income and expenses
  const incomeExpenseSummary = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  // Separate income and expenses
  const income = incomeExpenseSummary.find((item) => item._id === "income")?.total || 0;
  const expenses = incomeExpenseSummary.find((item) => item._id === "expense")?.total || 0;

  // 2. Link expenses with categories and subcategories
  const categoryExpenses = await Transaction.aggregate([
    {
      $match: {
        userId,
        type: "expense",
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $group: {
        _id: "$categoryDetails.name",
        total: { $sum: "$amount" },
        subCategories: { $push: "$categoryDetails.subCategories" },
      },
    },
  ]);

  // 3. Check budgets and notify if exceeded
  const budgets = await Budget.find({ userId, status: "active" });
  const budgetNotifications = budgets.map((budget) => {
    if (budget.spent > budget.amount) {
      return {
        budgetName: budget.name,
        exceededBy: budget.spent - budget.amount,
        status: "Exceeded",
      };
    }
    return {
      budgetName: budget.name,
      remaining: budget.amount - budget.spent,
      status: "Within Limit",
    };
  });

  // 4. Transaction summary by account
  const accountSummary = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "accountId",
        foreignField: "_id",
        as: "accountDetails",
      },
    },
    {
      $unwind: "$accountDetails",
    },
    {
      $group: {
        _id: "$accountDetails.name",
        totalIncome: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
        },
        totalExpense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
        },
      },
    },
  ]);

  return {
    summary: {
      income,
      expenses,
      netBalance: income - expenses,
    },
    categoryExpenses,
    budgetNotifications,
    accountSummary,
  };
};
