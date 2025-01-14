import { NextFunction, Request, Response } from "express"
import { generateToken, verifyRefreshToken } from "../utils/Tokens";


export const refreshTokenMiddleWare=async(req:Request,res:Response,next:NextFunction)=>{
    const refreshTokenExist=req.cookies.refresh_token

    if(!refreshTokenExist){
        return res.status(401).json({ error: "No refresh token provided" });
    }
    
    const decoded=verifyRefreshToken(refreshTokenExist)
    if(!decoded || typeof decoded==="string"){
        return res.status(403).json({ error: "Invalid or expired refresh token" });
    }

    const newAccessToken=generateToken({
        _id: decoded.data._id,
        firstName: decoded.data.firstName,
        email: decoded.data.email,
        role: decoded.data.role,
      }, { expiresIn: "15m" })
      return res.status(200).json({newAccessToken})
}