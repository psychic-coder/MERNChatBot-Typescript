import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "OK",
      users,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(200).json({
        message: "Error",
        cause: error.message,
      });
    } else {
      return res.status(200).json({
        message: "Error",
        cause: "Unknown error",
      });
    }
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(200).json({ message: "OK", id:user._id.toString() });
  } catch (error) {
    return res.status(200).json({
      message: "Error",
      cause: "Unknown error",
    });
  }
};
