import express from "express";

import {
  getAllBooks,
  getBooksByTitle,
  getBooksByPriceRange,
  getBooksByRatingsRange,
  getBooksByLimit,
  getBooksBySorting,
} from "../controllers/booksFromDBController.js";

const fetchBookFromDBController = express.Router();

fetchBookFromDBController.get("/all-books", getAllBooks);
fetchBookFromDBController.get("/books/title", getBooksByTitle);
fetchBookFromDBController.get("/books/price-range", getBooksByPriceRange);
fetchBookFromDBController.get("/books/rating-range", getBooksByRatingsRange);
fetchBookFromDBController.get("/books/limit", getBooksByLimit);
fetchBookFromDBController.get("/books/sort", getBooksBySorting);

export { fetchBookFromDBController };
