import { CategoryPayload, UpdateCategoryPayload } from "../../types";
import { Category } from "../models/Category";
import { createCustomError } from "../utils/errorUtils";

export const createCategoryService = async (data: CategoryPayload) => {
  const { userId, name, type, subCategories } = data;
  const categoryExist = await Category.findOne({ userId, name });
  console.log("existing category",categoryExist)
  if (categoryExist) {
    throw createCustomError(
      "category exist",
      `category with name=${name} already Exist!`,
      400
    );
  }
  const newCategory = await Category.create({
    userId,
    name,
    type,
    subCategories,
  });
  return newCategory;
};

export const allUserCategoriesService = async (userId: string) => {
  const categories = await Category.find({ userId });
  if (!categories || categories.length <= 0) {
    throw createCustomError("No Categories", "No categories Found!", 404);
  }
  return categories;
};

export const updateCategoryService = async (
  catId: string,
  data: UpdateCategoryPayload
) => {
  const { userId, name, type, subCategories } = data;
  const categoryExist = await Category.findById(catId);
  const userCategory = await Category.findOne({ userId, _id: catId });
  if (!categoryExist) {
    throw createCustomError("noCategoryExist", "No Category Found!", 404);
  }

  if (!userCategory) {
    throw createCustomError(
      "noCategoryOwnership",
      "Not Allowed To Update Category!",
      403
    );
  }

  categoryExist.name = name || categoryExist.name;
  categoryExist.type = type || categoryExist.type;
  categoryExist.subCategories = subCategories || categoryExist.subCategories;
  const updatedCategory=await categoryExist.save()
  return updatedCategory
};

export const deleteCategoryService=async(userId:string,catId:string)=>{
    const catExist=await Category.findOneAndDelete({userId,_id:catId})
    if(!catExist){
        throw createCustomError("noCategoryFound",`No Category Found With Id=${catId}`,404)
    }
    return {
        message:"Account Deleted Successfully!",
        catId
    }
}

export const getCategoryService = async (userId: string, categoryId: string) => {
  const categoryExist = await Category.findOne({ userId, _id: categoryId })
    .populate("userId", "firstName lastName")
  if (!categoryExist) {
    throw createCustomError(
      "nocategoryFound",
      `No category Found With Id=${categoryId}`,
      404
    );
  }

  return categoryExist;
};