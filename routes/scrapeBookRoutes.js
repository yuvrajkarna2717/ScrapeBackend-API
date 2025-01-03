import express from "express";
import {
  scrapeBookDetailsAndSaveToDB,
  scrapeAllBookDetails,
  scrapeBookDetails,
} from "../controllers/scrapeBookController.js";

const bookController = express.Router();

// storing all the book details in DB after scraping
bookController.post("/save/all-books-details", scrapeBookDetailsAndSaveToDB);

// return all the book details which takes alot of time
bookController.get("/all-books-details", scrapeAllBookDetails);

//can returns book details with 2 params pageX or both pageX to pageY
bookController.get("/book-details", scrapeBookDetails);

export { bookController };
