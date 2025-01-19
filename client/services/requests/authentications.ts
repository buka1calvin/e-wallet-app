import { User } from "@/types";
import customAxios from "../customAxios";

export const createUser=async(data:User)=>{
    try{
        const response=await customAxios.post('/users/signup',data)
        return response.data
    }catch(error:any){
        const errorMessage=error.response.data.message || 'an error Occured during user Creation!'
        throw new Error(errorMessage)
    }
}

export const loginUser=async(email:string,password:string)=>{
    try{
        const response=await customAxios.post("/users/login",{email,password})
        return response.data
    }catch(error:any){
        const errorMessage=error.response.data.message || 'an error Occured during user Login!'
        throw new Error(errorMessage)
    }
}

export const getUser=async()=>{
    try{
        const response=await customAxios.get("/users/me")
        return response.data
    }catch(error:any){
        const errorMessage=error.response.data.message || 'an error Occured during user  fetching!'
        throw new Error(errorMessage)
    }
}

export const logoutUser = async () => {
    try {
      const response = await customAxios.post("/users/logout");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during logout!";
      throw new Error(errorMessage);
    }
  };