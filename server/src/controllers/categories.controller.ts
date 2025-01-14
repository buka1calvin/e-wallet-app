import { NextFunction, Request, Response } from "express";
import {
  allUserCategoriesService,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
} from "../services/category.service";
import { UpdateCategoryPayload } from "../../types";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { name, subCategories, type } = req.body;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User must be Logged In!" });
    }
    const catPayload = {
      userId,
      name,
      subCategories,
      type,
    };
    const newCategory = await createCategoryService(catPayload);
    return res
      .status(201)
      .json({ message: "Category created Successfully!", newCategory });
  } catch (error) {
    next(error);
  }
};

export const getAlluserCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User Must be Logged In!" });
    }
    const allCategories = await allUserCategoriesService(userId);
    return res.status(200).json(allCategories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const catId = req.params.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "User must be LoggedIn" });
    }
    const dataPayload: UpdateCategoryPayload = {
      ...req.body,
      userId,
    };
    const updatedCategory = await updateCategoryService(catId, dataPayload);
    return res
      .status(200)
      .json({ message: "Category Updated Successfully!", updatedCategory });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const catId = req.params.id;
  try{
    if(!userId){
        return res.status(401).json({message:"User must be Logged In!"})
    }
    const result=await deleteCategoryService(userId,catId)
    return res.status(200).json(result)
  }catch(error){
    next(error)
  }
};
