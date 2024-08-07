import express from "express"
import { getAllUsers, userLogin, userSignUp } from "../controllers/user.controllers.js";
import { loginValidator, signUpValidator, validate } from "../middlewares/validator.js";

const userRoutes=express.Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signUpValidator),userSignUp);
userRoutes.post("/login",validate(loginValidator),userLogin);


export default userRoutes;