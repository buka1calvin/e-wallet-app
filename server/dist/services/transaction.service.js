"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionService = exports.updateUserTransactionService = exports.transactionDetailsService = exports.allUserTransactionsServices = exports.createTransactionService = void 0;
const Account_1 = require("../models/Account");
const Category_1 = require("../models/Category");
const Transaction_1 = require("../models/Transaction");
const errorUtils_1 = require("../utils/errorUtils");
const createTransactionService = async (data) => {
    const { userId, categoryId, description, amount, accountId, date, type } = data;
    if (amount <= 0) {
        throw (0, errorUtils_1.createCustomError)("invalid_amount", "Transaction amount must be greater than zero.", 400);
    }
    const category = await Category_1.Category.findOne({ _id: categoryId, userId });
    if (!category) {
        throw (0, errorUtils_1.createCustomError)("category_not_found", `Category with ID=${categoryId} does not exist or does not belong to the user.`, 404);
    }
    const account = await Account_1.Account.findOne({ _id: accountId, userId });
    if (!account) {
        throw (0, errorUtils_1.createCustomError)("account_not_found", `Account with ID=${accountId} does not exist or does not belong to the user.`, 404);
    }
    if (type === "expense") {
        if (account.balance < amount) {
            throw (0, errorUtils_1.createCustomError)("insufficient_funds", "Insufficient funds in the selected account.", 400);
        }
        account.balance -= amount;
    }
    else if (type === "income") {
        account.balance += amount;
    }
    else {
        throw (0, errorUtils_1.createCustomError)("InvalidType", "Transaction type must be either income or expense", 400);
    }
    await account.save();
    const newTransaction = await Transaction_1.Transaction.create({
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
exports.createTransactionService = createTransactionService;
const allUserTransactionsServices = async (userId) => {
    const allTransactions = await Transaction_1.Transaction.find({ userId })
        .populate("userId", "firstName lastName")
        .populate("accountId", "name")
        .populate("categoryId", "name subCategories");
    if (!allTransactions || allTransactions.length <= 0) {
        throw (0, errorUtils_1.createCustomError)("NoTransactionsFound", "There is no User Transaction Found!", 404);
    }
    return allTransactions;
};
exports.allUserTransactionsServices = allUserTransactionsServices;
const transactionDetailsService = async (id) => {
    const transaction = await Transaction_1.Transaction.findById({ _id: id })
        .populate("userId", "firstName lastName")
        .populate("accountId", "name")
        .populate("categoryId", "name subCategories");
    if (!transaction) {
        throw (0, errorUtils_1.createCustomError)("NoTransaction", "there is no Transaction Found!", 404);
    }
    return transaction;
};
exports.transactionDetailsService = transactionDetailsService;
const updateUserTransactionService = async (transactionId, data) => {
    const { userId, categoryId, description, amount, accountId, date, type } = data;
    const transaction = await Transaction_1.Transaction.findOne({ userId, _id: transactionId })
        .populate("userId", "firstName lastName")
        .populate("accountId", "name")
        .populate("categoryId", "name subCategories");
    const category = await Category_1.Category.findOne({ _id: categoryId, userId });
    const account = accountId
        ? await Account_1.Account.findOne({ _id: accountId, userId })
        : await Account_1.Account.findOne({ _id: transaction?.accountId, userId });
    console.log("account==", account);
    if (!account) {
        throw (0, errorUtils_1.createCustomError)("account_not_found", `Account with ID=${accountId || transaction?.accountId} does not exist or does not belong to the user.`, 404);
    }
    if (!transaction) {
        throw (0, errorUtils_1.createCustomError)("user_transaction_not_found", `transaction with ID=${transactionId} does not exist or does not belong to the user.`, 404);
    }
    if (amount !== undefined) {
        if (amount <= 0) {
            throw (0, errorUtils_1.createCustomError)("invalid_amount", "Transaction amount must be greater than zero.", 400);
        }
        let updatedBalance = account.balance;
        if (type === "expense" && amount !== transaction.amount && account) {
            if (account.balance < amount) {
                throw (0, errorUtils_1.createCustomError)("insufficient_funds", "Insufficient funds in the selected account.", 400);
            }
            updatedBalance += transaction.amount - amount;
        }
        if (type === "income" && amount !== transaction.amount && account) {
            updatedBalance += amount - transaction.amount;
        }
        await Account_1.Account.findByIdAndUpdate(account._id, { balance: updatedBalance }, { new: true, runValidators: true });
    }
    if (categoryId && !category) {
        throw (0, errorUtils_1.createCustomError)("category_not_found", `Category with ID=${categoryId} does not exist or does not belong to the user.`, 404);
    }
    if (accountId && !account) {
        throw (0, errorUtils_1.createCustomError)("account_not_found", `Account with ID=${accountId} does not exist or does not belong to the user.`, 404);
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
exports.updateUserTransactionService = updateUserTransactionService;
const deleteTransactionService = async (transactionId, userId) => {
    const transactionExist = await Transaction_1.Transaction.findOneAndDelete({
        userId,
        _id: transactionId,
    });
    if (!transactionExist) {
        throw (0, errorUtils_1.createCustomError)("noTransactionFound", `No Transaction Found With Id=${transactionId}`, 404);
    }
    return {
        message: "Transaction deleted Successfully!",
        transactionId,
    };
};
exports.deleteTransactionService = deleteTransactionService;
