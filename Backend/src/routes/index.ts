import express, {Router} from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter=express.Router();

appRouter.use('/user',userRoutes);
appRouter.use("/chats",chatRoutes)


export default appRouter;
