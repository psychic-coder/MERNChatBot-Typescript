import express from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../middlewares/validator.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat.controllers.js";

//protected api
const chatRoutes=express.Router();

chatRoutes.post("/new",validate(chatCompletionValidator),verifyToken,generateChatCompletion)
chatRoutes.get("/all-chats",verifyToken,sendChatsToUser);
chatRoutes.delete("/delete",verifyToken,deleteChats);

export default chatRoutes;