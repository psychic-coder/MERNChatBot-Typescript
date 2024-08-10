import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {message}=req.body;
    const user=await User.findById(res.locals.jwtData.id);
    if(!user){
        return res.status(401).json({message:"User is not registered or token malfunctions"});
    }
    


};
