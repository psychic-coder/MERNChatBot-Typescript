import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import morgan from "morgan";
import appRouter from './routes/index.js';


dotenv.config({ path: './.env' });

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS if needed
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); 

//TODO:REMOVE MORGAN BEFORE DEPLOYING ON PRODUCTION
app.use(morgan("dev"));

// Error handling middleware should be added after all routes
app.use(errorMiddleware);
app.use("/api/v1",appRouter);

export default app;
