import express from "express"
import { getAllUsers, userSignUp } from "../controllers/user.controllers.js";

const userRoutes=express.Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",userSignUp);


export default userRoutes;