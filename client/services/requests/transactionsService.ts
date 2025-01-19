import { TransactionProps, UpdateTransaction } from "@/types";
import customAxios from "../customAxios";

export const createTransaction = async (data: TransactionProps) => {
  try {
    const response = await customAxios.post("/transactions", data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while creating a Category!";
    throw new Error(errorMessage);
  }
};

export const getTransactions = async () => {
  try {
    const response = await customAxios.get("/transactions");
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while fetching Transactions!";
    throw new Error(errorMessage);
  }
};

export const getTransaction = async (id: string) => {
  try {
    const response = await customAxios.get(`/transactions/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while fetching a Transaction!";
    throw new Error(errorMessage);
  }
};
export const deleteTransaction = async (id: string) => {
  try {
    const response = await customAxios.delete(`/transactions/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while deleting a Transaction!";
    throw new Error(errorMessage);
  }
};

export const updateTransactionService = async (id: string, data: UpdateTransaction) => {
  try {
    const response = await customAxios.patch(`/transactions/${id}`, data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while updating a Transaction!";
    throw new Error(errorMessage);
  }
};
