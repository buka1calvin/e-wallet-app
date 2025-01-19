import { BudgetProps, updateBudget } from "@/types";
import customAxios from "../customAxios";

export const createBudget = async (data: BudgetProps) => {
  try {
    const response = await customAxios.post("/budgets", data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while creating a Budget!";
    throw new Error(errorMessage);
  }
};

export const getBudgets = async () => {
    try {
      const response = await customAxios.get("/budgets");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ||
        "an error Occured while fetching Budgets!";
      throw new Error(errorMessage);
    }
  };


  export const getBudget = async (id:string) => {
    try {
      const response = await customAxios.get(`/budgets/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ||
        "an error Occured while fetching a Budget!";
      throw new Error(errorMessage);
    }
  };
  export const deleteBudget = async (id:string) => {
    try {
      const response = await customAxios.delete(`/budgets/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ||
        "an error Occured while deleting a Budget!";
      throw new Error(errorMessage);
    }
  };

  export const updateBudgetService = async (id:string,data:updateBudget) => {
    try {
      const response = await customAxios.put(`/budgets/${id}`,data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ||
        "an error Occured while updating a Budget!";
      throw new Error(errorMessage);
    }
  };

  export const updateBudgetExpense = async (id:string,expense:number) => {
    try {
      const response = await customAxios.patch(`/budgets/${id}/spent`,expense);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ||
        "an error Occured while updating a Budget expenditure!";
      throw new Error(errorMessage);
    }
  };
