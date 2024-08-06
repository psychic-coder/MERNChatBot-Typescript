import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"

export const getAllUsers=async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const users=await User.find();
            return res.status(200).json({
                message:"OK",
                users
            })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(200).json({
                    message: "Error",
                    cause: error.message
                });
            } else {
                return res.status(200).json({
                    message: "Error",
                    cause: "Unknown error"
                });
            }
        }
}