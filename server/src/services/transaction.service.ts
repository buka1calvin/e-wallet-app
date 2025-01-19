import { TransactionPayload, UpdatedTransactionPayload } from "../../types";
import { Account } from "../models/Account";
import { Category } from "../models/Category";
import { Transaction } from "../models/Transaction";
import { createCustomError } from "../utils/errorUtils";

export const createTransactionService = async (data: TransactionPayload) => {
  const { userId, categoryId, description, amount, accountId, date, type } =
    data;
  if (amount <= 0) {
    throw createCustomError(
      "invalid_amount",
      "Transaction amount must be greater than zero.",
      400
    );
  }

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
  if (type === "expense") {
    if (account.balance < amount) {
      throw createCustomError(
        "insufficient_funds",
        "Insufficient funds in the selected account.",
        400
      );
    }
    account.balance -= amount;
  } else if (type === "income") {
    account.balance += amount;
  } else {
    throw createCustomError(
      "InvalidType",
      "Transaction type must be either income or expense",
      400
    );
  }
  await account.save();
  const newTransaction = await Transaction.create({
    userId,
    categoryId,
    description,
    amount,
    accountId,
    date,
    type,
  });
  return newTransaction;
};

export const allUserTransactionsServices = async (userId: string) => {
  const allTransactions = await Transaction.find({ userId })
    .populate("userId", "firstName lastName")
    .populate("accountId", "name")
    .populate("categoryId", "name subCategories");
  if (!allTransactions || allTransactions.length <= 0) {
    throw createCustomError(
      "NoTransactionsFound",
      "There is no User Transaction Found!",
      404
    );
  }
  return allTransactions;
};

export const transactionDetailsService = async (id: string) => {
  const transaction = await Transaction.findById({ _id: id })
    .populate("userId", "firstName lastName")
    .populate("accountId", "name")
    .populate("categoryId", "name subCategories");
  if (!transaction) {
    throw createCustomError(
      "NoTransaction",
      "there is no Transaction Found!",
      404
    );
  }
  return transaction;
};

export const updateUserTransactionService = async (
  transactionId: string,
  data: UpdatedTransactionPayload
) => {
  const { userId, categoryId, description, amount, accountId, date, type } =
    data;
  const transaction = await Transaction.findOne({ userId, _id: transactionId })
    .populate("userId", "firstName lastName")
    .populate("accountId", "name")
    .populate("categoryId", "name subCategories");
  const category = await Category.findOne({ _id: categoryId, userId });
  const account = accountId
    ? await Account.findOne({ _id: accountId, userId })
    : await Account.findOne({ _id: transaction?.accountId, userId });
  console.log("account==", account);
  if (!account) {
    throw createCustomError(
      "account_not_found",
      `Account with ID=${
        accountId || transaction?.accountId
      } does not exist or does not belong to the user.`,
      404
    );
  }
  if (!transaction) {
    throw createCustomError(
      "user_transaction_not_found",
      `transaction with ID=${transactionId} does not exist or does not belong to the user.`,
      404
    );
  }

  if (amount !== undefined) {
    if (amount <= 0) {
      throw createCustomError(
        "invalid_amount",
        "Transaction amount must be greater than zero.",
        400
      );
    }
    let updatedBalance = account.balance;
    if (type === "expense" && amount !== transaction.amount && account) {
      if (account.balance < amount) {
        throw createCustomError(
          "insufficient_funds",
          "Insufficient funds in the selected account.",
          400
        );
      }
      updatedBalance += transaction.amount - amount;
    }
    if (type === "income" && amount !== transaction.amount && account) {
      updatedBalance += amount - transaction.amount;
    }
    await Account.findByIdAndUpdate(
      account._id,
      { balance: updatedBalance },
      { new: true, runValidators: true }
    );
  }

  if (categoryId && !category) {
    throw createCustomError(
      "category_not_found",
      `Category with ID=${categoryId} does not exist or does not belong to the user.`,
      404
    );
  }

  if (accountId && !account) {
    throw createCustomError(
      "account_not_found",
      `Account with ID=${accountId} does not exist or does not belong to the user.`,
      404
    );
  }

  transaction.categoryId = categoryId || transaction.categoryId;
  transaction.description = description || transaction.description;
  transaction.type = type || transaction.type;
  transaction.amount = amount || transaction.amount;
  transaction.accountId = accountId || transaction.accountId;
  transaction.date = date || transaction.date;
  const updatedTransaction = await transaction.save();
  return updatedTransaction;
};

export const deleteTransactionService = async (
  transactionId: string,
  userId: string
) => {
  const transactionExist = await Transaction.findOneAndDelete({
    userId,
    _id: transactionId,
  });
  if (!transactionExist) {
    throw createCustomError(
      "noTransactionFound",
      `No Transaction Found With Id=${transactionId}`,
      404
    );
  }
  return {
    message: "Transaction deleted Successfully!",
    transactionId,
  };
};
