import OpenAI from "openai";
import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import MistralClient from '@mistralai/mistralai';





 // Assuming you have a User model in the models directory

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

// const apiKey = process.env.MISTRAL_API_KEY;
// const client = new MistralClient(apiKey);


  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!, // Use your environment variable or hardcode the API key here
      organization: process.env.OPENAI_ORGANIZATION_ID!
    });

    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    // Explicitly typing role and content for each chat message
    const chats: Array<{ role: "user" | "assistant" | "system"; content: string }> = user.chats.map(({ role, content }) => ({
      role: role as "user" | "assistant" | "system", // Explicitly asserting type
      content,
    }));

    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to OpenAI API
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chats,
    });

    // save response
    const aiMessage = chatResponse.choices[0].message;
    user.chats.push(aiMessage);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause:"Error in sendChatsToUser" });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: "error in deleteChats"});
  }
};
