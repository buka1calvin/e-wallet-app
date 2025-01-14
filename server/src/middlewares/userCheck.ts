import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { UserPayload } from "../../types";


const userExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      console.log(exists);
      return res.status(400).json({ status: false, error: "email already exist!" });
    }
    req.user = exists;
    next();
  } catch (error) {
    next(error);
  }
};

export default userExist;
