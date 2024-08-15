import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const secretKey = process.env.JWT_SECRET || 'your_secret_key';
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }
    const envSecret = process.env.JWT_SECRET;
    try {
        jwt.verify(token, envSecret, (err, success) => {
            if (err) {
                return res.status(401).json({ message: "Token Expired", cause: err.message });
            }
            res.locals.jwtData = success;
            next();
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", cause: error });
    }
};
//# sourceMappingURL=token-manager.js.map