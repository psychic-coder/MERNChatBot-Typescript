
import app from "./app.js";
import { connectToDatabase, disconnectFromDatabase } from "./db/connection.js";

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";

connectToDatabase()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(
        `Server is running on Port: ${port} in ${envMode} Mode.`
      )
    );
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    disconnectFromDatabase();
    process.exit(1); 
  });



// Wildcard route should be placed after all other routes and middlewares
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

