import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

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
    //chats of the user
    //send all the chats with one to openai api

    const chats = user.chats.map(({ role, content }) => ({
        role,
        content,
      })) as ChatCompletionRequestMessage[];
      chats.push({ content: message, role: "user" });
      user.chats.push({ content: message, role: "user" });
  

};
