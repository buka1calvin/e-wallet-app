import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/Tokens";
import User from "../models/User";

interface CustomRequest extends Request {
  user?: any;
}

const extractToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ status: 401, message: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];
    const details = verifyToken(token);

    if (typeof details === "string" || !details || !details.data || !details.data.email) {
      return res.status(401).json({ status: 401, message: "Invalid token" });
    }

    const userExists = await User.findOne({ email: details.data.email });
    if (!userExists) {
      return res.status(401).json({ status: 401, message: "User not found!" });
    }

    req.user = userExists;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: "No valid credentials" });
  }
};

export default extractToken;
