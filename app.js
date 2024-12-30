import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// book controller
import { bookController } from "./routes/scrapeBookRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Scrape book details and store to MongoDB
app.use("/api/scrape", bookController);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
