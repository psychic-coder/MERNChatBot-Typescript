import express from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
const appRouter = express.Router();
appRouter.use('/user', userRoutes);
appRouter.use("/chat", chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map