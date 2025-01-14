import { NextFunction, Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/user.service";
import { generateRefreshToken, generateToken } from "../utils/Tokens";
import { UserPayload } from "../../types";
import BcryptUtil from "../utils/bcrypt";
import User from "../models/User";


export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, telephone, password } =
      req.body;
    const userData:UserPayload = {
      firstName,
      lastName,
      email,
      telephone,
      password
    };
    const token: string = generateToken(userData, { expiresIn: "10min" });
    const response = await registerUserService(userData);
    return res.status(201).json({
      user: response,
      message: "User Registered successfully !",
      token: token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const {email,password}=req.body;
    const user=await loginUserService({email,password})
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const userToken= {
      _id: user.id,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateToken(userToken, { expiresIn: "2days" });
    const refreshToken=generateRefreshToken(userToken,{expiresIn:"7days"})

    res.cookie('refresh_token',refreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"strict",
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
    return res.status(200).json({
      user: user,
      token: accessToken,
    });
  } catch (error) {
    next(error)
  }
};


export const userUpdate = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const updateData = req.body;
    
    if (updateData.password) {
      updateData.password = BcryptUtil.hash(updateData.password);
    }

    const updatedUser = await User.findByIdAndUpdate(user?._id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json({
      user: updatedUser,
      message: "User updated successfully!",
    });
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).select('-password');
    
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
