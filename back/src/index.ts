import express from "express";
import connectDB from "./db/connection";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router";
import anaylticsRouter from "./routes/analytics.router";
import path from "path";

dotenv.config();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = express();
app.use(express.json());

connectDB()
  .then(() => {
    app.use("/api/products", productsRouter);
    app.use("/api/analytics", anaylticsRouter);
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, "public")));

    // Handle SPA routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
