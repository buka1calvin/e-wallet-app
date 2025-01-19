import { AccountProps, UpdateAccount } from "@/types";
import customAxios from "../customAxios";

export const createAccount = async (data: AccountProps) => {
  try {
    const response = await customAxios.post("/accounts", data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message ||
      "an error Occured while creating an Account!";
    throw new Error(errorMessage);
  }
};

export const getAccounts = async () => {
  try {
    const response = await customAxios.get("/accounts");
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message || "an error Occured while fetching Accounts";
    throw new Error(errorMessage);
  }
};

export const getAccount = async (id: string) => {
  try {
    const response = await customAxios.get(`/accounts/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response.data.message || "an error Occured while fetching Accounts";
    throw new Error(errorMessage);
  }
};

export const updateAccount=async(id:string,data:UpdateAccount)=>{
    try {
        const response = await customAxios.put(`/accounts/${id}`,data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response.data.message || "an error Occured while update account";
        throw new Error(errorMessage);
      }
}

export const deleteAccount=async(id:string)=>{
    try {
        const response = await customAxios.delete(`/accounts/${id}`);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response.data.message || "an error Occured while update account";
        throw new Error(errorMessage);
      }
}
