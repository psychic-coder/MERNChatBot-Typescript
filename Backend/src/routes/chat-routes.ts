import express from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../middlewares/validator.js";
import { generateChatCompletion } from "../controllers/chat.controllers.js";

//protected api
const chatRoutes=express.Router();

chatRoutes.post("/new",validate(chatCompletionValidator),verifyToken,generateChatCompletion)

export default chatRoutes;