"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccount = exports.deleteAccount = exports.updateAccount = exports.getAllUserAccounts = exports.createAccount = void 0;
const account_service_1 = require("../services/account.service");
const createAccount = async (req, res, next) => {
    const user = req.user;
    try {
        if (!user || !user._id) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const { name, type, accountNumber, balance } = req.body;
        const AccountPayload = {
            userId: user._id,
            name,
            type,
            accountNumber,
            balance,
        };
        const newAccount = await (0, account_service_1.createAccountSevice)(AccountPayload);
        return res
            .status(201)
            .json({
            message: "new Account Created Successfully!",
            newAccount,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createAccount = createAccount;
const getAllUserAccounts = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User Must be Logged In!" });
        }
        const allAccounts = await (0, account_service_1.allUserAccountsService)(userId);
        return res.status(200).json(allAccounts);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUserAccounts = getAllUserAccounts;
const updateAccount = async (req, res, next) => {
    const userId = req.user?._id;
    const accountId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "user Must Be Logged In!" });
        }
        if (!accountId) {
            return res.status(400).json({ error: "Account ID is required." });
        }
        const data = {
            ...req.body,
            userId
        };
        const updatedAccount = await (0, account_service_1.updateAccountService)(accountId, data);
        return res.status(200).json({ message: "account Updated SuccessFully!", updatedAccount });
    }
    catch (error) {
        next(error);
    }
};
exports.updateAccount = updateAccount;
const deleteAccount = async (req, res, next) => {
    const userId = req.user?._id;
    const accountId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const result = await (0, account_service_1.deleteAccountService)(userId, accountId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAccount = deleteAccount;
const getAccount = async (req, res, next) => {
    const userId = req.user?._id;
    const accountId = req.params.id;
    try {
        if (!userId) {
            return res.status(401).json({ message: "User must be Logged In!" });
        }
        const account = await (0, account_service_1.getAccountService)(userId, accountId);
        return res.status(200).json(account);
    }
    catch (error) {
        next(error);
    }
};
exports.getAccount = getAccount;
