import { NextFunction, Request, Response } from "express";
import {
  allUserTransactionsServices,
  createTransactionService,
  deleteTransactionService,
  transactionDetailsService,
  updateUserTransactionService,
} from "../services/transaction.service";
import { UpdatedTransactionPayload } from "../../types";

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const newTransaction = await createTransactionService(transactionData);
    return res.status(201).json({
      message: "New Transaction created Successfully!",
      newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

export const AllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User must be Logged In!" });
    }
    const allTransactions = await allUserTransactionsServices(userId);
    return res.status(200).json(allTransactions);
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transactionId = req.params.id;
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User must be Logged In!" });
    }
    const transactionDetails = await transactionDetailsService(transactionId);
    return res.status(200).json({ transaction: transactionDetails });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const transactionId=req.params.id;
    const userId=req.user?._id;
    try{
    if (!userId) {
      return res.status(401).json({ message: "user Must Be Logged In!" });
    }
    if (!transactionId) {
      return res.status(400).json({ error: "Transaction ID is required." });
    }
    const data:UpdatedTransactionPayload={
        ...req.body,
        userId
    }
    const updateTransaction=await updateUserTransactionService(transactionId,data)
    return res.status(200).json(updateTransaction)
    }catch(error){
        next(error)
    }
};

export const deleteTransaction=async(
  req: Request,
  res: Response,
  next: NextFunction
)=>{
const userId=req.user?._id;
const transactionId=req.params.id;
try{
  if(!userId){
    return res.status(401).json
  }
  const result=await deleteTransactionService(transactionId,userId)
  return res.status(200).json(result)
}catch(error){
  next(error)
}
}