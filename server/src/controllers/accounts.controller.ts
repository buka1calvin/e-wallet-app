import { NextFunction, Request, Response } from "express";
import {
  allUserAccountsService,
  createAccountSevice,
  deleteAccountService,
  getAccountService,
  updateAccountService,
} from "../services/account.service";
import { UpdateAccountPayload } from "../../types";

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const newAccount = await createAccountSevice(AccountPayload);
    return res
      .status(201)
      .json({
        message: "new Account Created Successfully!",
        newAccount,
      });
  } catch (error) {
    next(error);
  }
};

export const getAllUserAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User Must be Logged In!" });
    }

    const allAccounts = await allUserAccountsService(userId);
    return res.status(200).json( allAccounts);
  } catch (error) {
    next(error);
  }
};

export const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const accountId = req.params.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "user Must Be Logged In!" });
    }
    if (!accountId) {
      return res.status(400).json({ error: "Account ID is required." });
    }
    const data:UpdateAccountPayload={
        ...req.body,
        userId
    }
    const updatedAccount=await updateAccountService(accountId,data)
    return res.status(200).json({message:"account Updated SuccessFully!",updatedAccount})
  } catch (error) {
    next(error);
  }
};

export const deleteAccount=async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.user?._id
    const accountId=req.params.id;
    try{
        if(!userId){
            return res.status(401).json({message:"User must be Logged In!"})
        }
        const result = await deleteAccountService(userId, accountId);
        return res.status(200).json(result);
    }
    catch(error){
        next(error)
    }
}

export const getAccount=async(req:Request,res:Response,next:NextFunction)=>{
  const userId=req.user?._id
  const accountId=req.params.id;
  try{
      if(!userId){
          return res.status(401).json({message:"User must be Logged In!"})
      }
      const account = await getAccountService(userId, accountId);
      return res.status(200).json(account);
  }
  catch(error){
      next(error)
  }
}