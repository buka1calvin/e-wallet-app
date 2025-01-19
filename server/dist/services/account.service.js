"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountService = exports.deleteAccountService = exports.updateAccountService = exports.allUserAccountsService = exports.createAccountSevice = void 0;
const Account_1 = require("../models/Account");
const errorUtils_1 = require("../utils/errorUtils");
const createAccountSevice = async (data) => {
    const { userId, name, type, accountNumber, balance } = data;
    if (type === "cash") {
        const existingCashAccount = await Account_1.Account.findOne({ userId, type: "cash" });
        if (existingCashAccount) {
            throw (0, errorUtils_1.createCustomError)("AccountExistsError", "User already has a cash account.", 400);
        }
    }
    if (accountNumber) {
        const existingAccount = await Account_1.Account.findOne({ accountNumber });
        if (existingAccount) {
            throw (0, errorUtils_1.createCustomError)("AccountExistsError", `Account with number ${accountNumber} already exists.`, 400);
        }
    }
    const newAccount = await Account_1.Account.create({
        userId,
        name,
        type,
        accountNumber,
        balance,
    });
    return newAccount;
};
exports.createAccountSevice = createAccountSevice;
const allUserAccountsService = async (userId) => {
    const allAccounts = await Account_1.Account.find({ userId });
    if (!allAccounts || allAccounts.length <= 0) {
        throw (0, errorUtils_1.createCustomError)("noAccounts", "user Accounts Not Found", 404);
    }
    return allAccounts;
};
exports.allUserAccountsService = allUserAccountsService;
const updateAccountService = async (accountId, data) => {
    const { userId, name, type, accountNumber, balance } = data;
    const accountExist = await Account_1.Account.findById({ _id: accountId });
    const userAccount = await Account_1.Account.findOne({ userId, _id: accountId });
    if (!accountExist) {
        throw (0, errorUtils_1.createCustomError)("noAccountExists", "No Account Found!", 404);
    }
    if (!userAccount) {
        throw (0, errorUtils_1.createCustomError)("noAccounOwnership", "Not Allowed To Update Account", 403);
    }
    accountExist.name = name || accountExist.name;
    accountExist.type = type || accountExist.type;
    accountExist.accountNumber = accountNumber || accountExist.accountNumber;
    accountExist.balance = balance !== undefined ? balance : accountExist.balance;
    const updatedAccount = await accountExist.save();
    return updatedAccount;
};
exports.updateAccountService = updateAccountService;
const deleteAccountService = async (userId, accountId) => {
    const accountExist = await Account_1.Account.findOneAndDelete({ userId, _id: accountId });
    if (!accountExist) {
        throw (0, errorUtils_1.createCustomError)("noAccountFound", `No Account Found With Id=${accountId}`, 404);
    }
    return {
        message: "Account Deleted Successfully!",
        accountId
    };
};
exports.deleteAccountService = deleteAccountService;
const getAccountService = async (userId, accountId) => {
    const accountExist = await Account_1.Account.findOne({ userId, _id: accountId });
    if (!accountExist) {
        throw (0, errorUtils_1.createCustomError)("noAccountFound", `No Account Found With Id=${accountId}`, 404);
    }
    return accountExist;
};
exports.getAccountService = getAccountService;
