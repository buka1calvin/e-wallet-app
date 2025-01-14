import { NextFunction } from "express";
import { AccountPayload, UpdateAccountPayload } from "../../types";
import { Account } from "../models/Account";
import { createCustomError } from "../utils/errorUtils";

export const createAccountSevice = async (data: AccountPayload) => {
  const { userId, name, type, accountNumber, balance } = data;

  if (type === "cash") {
    const existingCashAccount = await Account.findOne({ userId, type: "cash" });
    if (existingCashAccount) {
      throw createCustomError(
        "AccountExistsError",
        "User already has a cash account.",
        400
      );
    }
  }

  if (accountNumber) {
    const existingAccount = await Account.findOne({ accountNumber });
    if (existingAccount) {
      throw createCustomError(
        "AccountExistsError",
        `Account with number ${accountNumber} already exists.`,
        400
      );
    }
  }
  const newAccount = await Account.create({
    userId,
    name,
    type,
    accountNumber,
    balance,
  });

  return newAccount;
};

export const allUserAccountsService = async (userId: string) => {
  const allAccounts = await Account.find({ userId });
  if (!allAccounts || allAccounts.length <= 0) {
    throw createCustomError("noAccounts", "user Accounts Not Found", 404);
  }
  return allAccounts;
};

export const updateAccountService = async (
  accountId: string,
  data: UpdateAccountPayload
) => {
  const { userId , name, type, accountNumber, balance } = data;

  const accountExist = await Account.findById({ _id: accountId });
  const userAccount=await Account.findOne({userId,_id:accountId})
  if (!accountExist) {
    throw createCustomError("noAccountExists", "No Account Found!", 404);
  }

  if(!userAccount){
    throw createCustomError("noAccounOwnership", "Not Allowed To Update Account", 403);
  }

  accountExist.name = name || accountExist.name;
  accountExist.type = type || accountExist.type;
  accountExist.accountNumber = accountNumber || accountExist.accountNumber;
  accountExist.balance = balance !== undefined ? balance : accountExist.balance;
  const updatedAccount = await accountExist.save();
  return updatedAccount;
};

export const deleteAccountService=async(userId:string,accountId:string)=>{
    const accountExist=await Account.findOneAndDelete({userId,_id:accountId})
    if(!accountExist){
        throw createCustomError("noAccountFound",`No Account Found With Id=${accountId}`,404)
    }
    return {
        message:"Account Deleted Successfully!",
        accountId
    }
}
