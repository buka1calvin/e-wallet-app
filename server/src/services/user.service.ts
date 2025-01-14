import { LoginPayload, UserPayload } from "../../types";
import User from "../models/User";
import  BcryptUtil  from "../utils/bcrypt";

export const registerUserService = async (data:UserPayload) => {
  const { firstName, lastName, email, telephone, password } =
    data;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    telephone,
    password: BcryptUtil.hash(password),
  });
  return newUser;
};

export const loginUserService=async(data:LoginPayload)=>{
  const {email,password}=data;

  const user=await User.findOne({email})
  if(!user){
    throw new Error("Invalid email or Password!");
  }

  const isPasswordValid=BcryptUtil.compare(password,user.password)
  if(!isPasswordValid){
    throw new Error("Invalid email or password.");
  }
  return user;
}

