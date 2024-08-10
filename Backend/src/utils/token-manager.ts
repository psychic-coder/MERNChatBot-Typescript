import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

interface TokenPayload{
    id:string,
    email:string
}

export const createToken = (id: string, email: string, expiresIn: string | number): string => {
    const payload: TokenPayload = { id, email };
    const secretKey = process.env.JWT_SECRET || 'your_secret_key';
    const token = jwt.sign(payload, secretKey, { expiresIn});
    return token;
  };






  export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    
    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Token Not Received" });
    }
    
    const envSecret: string = process.env.JWT_SECRET as string;
  
    try {
      jwt.verify(token, envSecret, (err: Error | null, success: any ) => {
        if (err) {
          return res.status(401).json({ message: "Token Expired", cause: err.message });
        }
  
        res.locals.jwtData =success;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", cause: error });
    }
  };