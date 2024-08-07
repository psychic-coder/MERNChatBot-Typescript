import jwt from "jsonwebtoken";

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