import { connectToDatabase, disconnectFromDatabase } from "./db/connection.js";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import appRouter from './routes/index.js'; // Ensure this path is correct
import cookieParser from "cookie-parser";
dotenv.config({ path: './.env' });

const app = express();
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";

connectToDatabase()
  .then(() => {
   console.log("Database is running");
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    disconnectFromDatabase();
    process.exit(1); 
  });

// Middleware setup
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS if needed
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));

// Routes setup
app.use("/api/v1", appRouter)
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send("Backend is working");
  } catch (error) {
    next(error);
  }
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});





// Wildcard route should be placed after all other routes and middlewares
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Server is running on Port: ${port} in ${envMode} Mode.`
  )
);

export default app;
