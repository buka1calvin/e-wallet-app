import { NextFunction, Request, Response } from "express";
import { generateReport } from "../services/reports.service";

export const getReport = async (req: Request, res: Response,next:NextFunction) => {
    const userId=req.user?._id
  try {
    if(!userId){
        return res.status(401).json({message:"user Must be Logged In!"})
    }
    const { startDate, endDate } = req.query;

    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const report = await generateReport(
      userId.toString(),
      new Date(startDate as string),
      new Date(endDate as string)
    );

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error)
  }
};
