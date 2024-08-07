import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

//
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already registered with this email");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();



    //the below is the code for cookie and token
    res.clearCookie(COOKIE_NAME,{
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed:true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // TODO:Change the domain before hosting the website
    // the cookie will expire after 7 days , after creation
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed:true,
    });
    return res.status(200).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    return res.status(200).json({
      message: "Error",
      cause: "Unknown error",
    });
  }
};
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User is not registered ");
    }

    const isPasswordCorrect = await bcryptjs.compareSync(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password ");
    }

    res.clearCookie(COOKIE_NAME,{
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed:true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // TODO:Change the domain before hosting the website
    // the cookie will expire after 7 days , after creation
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed:true,
    });
    return res.status(200).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    return res.status(200).json({
      message: "Error",
      cause: "Unknown error",
    });
  }
};
