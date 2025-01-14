import {Request,NextFunction,Response } from "express";

export const errorHandler=(error:Error,req:Request,res:Response,next:NextFunction)=>{
    console.log(error)
    res.status(500).json({ error: error.message || "Internal Server Error" });
}