import { CategoryProps, UpdateCategory } from "@/types";
import customAxios from "../customAxios";

export const createCategory = async (data: CategoryProps) => {
  try {
    const response = await customAxios.post("/categories", data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while creating a Category!";
    throw new Error(errorMessage);
  }
};

export const getCategories = async () => {
  try {
    const response = await customAxios.get("/categories");
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while fetching Categories!";
    throw new Error(errorMessage);
  }
};

export const getCategory = async (id: string) => {
  try {
    const response = await customAxios.get(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while fetching a Category!";
    throw new Error(errorMessage);
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const response = await customAxios.delete(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while deleting a Category!";
    throw new Error(errorMessage);
  }
};

export const updateCategoryService = async (id: string, data: UpdateCategory) => {
  try {
    const response = await customAxios.put(`/categories/${id}`, data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while updating a Category!";
    throw new Error(errorMessage);
  }
};
