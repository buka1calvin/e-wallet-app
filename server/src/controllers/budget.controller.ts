import { NextFunction, Request, Response } from "express";
import {
  allBudgetsService,
  createBudgetService,
  deleteBudgetService,
  updateBudgetService,
  updateSpendingBudgetService,
} from "../services/budget.service";
import { UpdateBudgetPayload } from "../../types";

export const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User must be Logged In!" });
    }
    const data = {
      ...req.body,
      userId,
    };
    const newBudget = await createBudgetService(data);
    return res
      .status(201)
      .json({ message: "Budget Created SuccessFully", newBudget });
  } catch (error) {
    next(error);
  }
};

export const getAllBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User Must be Logged In!" });
    }
    const allBudgets = await allBudgetsService(userId);
    return res.status(200).json(allBudgets);
  } catch (error) {
    next(error);
  }
};

export const updateBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const budgetId = req.params.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User Must be Logged In!" });
    }
    const budgetData: UpdateBudgetPayload = {
      ...req.body,
      userId,
    };
    const updatedBudget = await updateBudgetService(budgetId, budgetData);
    return res.status(200).json({message:"budget updated successfuly",updatedBudget});
  } catch (error) {
    next(error);
  }
};

export const updateSpendingBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const userId = req.user?._id;
  const budgetId = req.params.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User Must be Logged In!" });
    }
    const {spentAmount}=req.body;
    const updatedSpending=await updateSpendingBudgetService(budgetId,userId,spentAmount)
    return res.status(200).json({message:"spending updated Successfully!",updatedSpending});
  } catch (error) {
    next(error);
  }
};

export const deleteBudget=async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.user?._id
    const budgetId=req.params.id;
    try{
        if(!userId){
            return res.status(401).json({message:"User must be Logged In!"})
        }
        const result = await deleteBudgetService(userId, budgetId);
        return res.status(200).json(result);
    }
    catch(error){
        next(error)
    }
}