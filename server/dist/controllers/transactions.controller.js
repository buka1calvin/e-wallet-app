"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransaction = exports.AllTransactions = exports.createTransaction = void 0;
const transaction_service_1 = require("../services/transaction.service");
const createTransaction = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const { categoryId, accountId, description, amount, date, type } = req.body;
        const transactionData = {
            categoryId,
            accountId,
            description,
            amount,
            date,
            type,
            userId,
        };
        const newTransaction = await (0, transaction_service_1.createTransactionService)(transactionData);
        return res.status(201).json({
            message: "New Transaction created Successfully!",
            newTransaction,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTransaction = createTransaction;
const AllTransactions = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const allTransactions = await (0, transaction_service_1.allUserTransactionsServices)(userId);
        return res.status(200).json(allTransactions);
    }
    catch (error) {
        next(error);
    }
};
exports.AllTransactions = AllTransactions;
const getTransaction = async (req, res, next) => {
    const transactionId = req.params.id;
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const transactionDetails = await (0, transaction_service_1.transactionDetailsService)(transactionId);
        return res.status(200).json({ transaction: transactionDetails });
    }
    catch (error) {
        next(error);
    }
};
exports.getTransaction = getTransaction;
const updateTransaction = async (req, res, next) => {
    const transactionId = req.params.id;
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "user Must Be Logged In!" });
        }
        if (!transactionId) {
            return res.status(400).json({ error: "Transaction ID is required." });
        }
        const data = {
            ...req.body,
            userId
        };
        const updateTransaction = await (0, transaction_service_1.updateUserTransactionService)(transactionId, data);
        return res.status(200).json(updateTransaction);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res, next) => {
    const userId = req.user?._id;
    const transactionId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json;
        }
        const result = await (0, transaction_service_1.deleteTransactionService)(transactionId, userId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTransaction = deleteTransaction;
