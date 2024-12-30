import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// book controller to scrape book details and save to DB
import { bookController } from "./routes/scrapeBookRoutes.js";

// fetch book details from DB
import { fetchBookFromDBController } from "./routes/booksFromDBRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Scrape book details and store to MongoDB
app.use("/api/scrape", bookController);

// fetch book details from mongoDB
app.use("/api/fetch", fetchBookFromDBController);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
