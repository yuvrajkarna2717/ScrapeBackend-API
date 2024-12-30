import express from "express";
import { scrapeBookDetailsAndSaveToDB } from "../controllers/scrapeBookController.js";

const bookController = express.Router();

// storing all the book details in DB after scraping
bookController.post("/save/all-books-details", scrapeBookDetailsAndSaveToDB);

export { bookController };
