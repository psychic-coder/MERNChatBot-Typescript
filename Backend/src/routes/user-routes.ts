import express from "express"
import { getAllUsers } from "../controllers/user.controllers.js";

const userRoutes=express.Router();

userRoutes.get("/",getAllUsers);


export default userRoutes;