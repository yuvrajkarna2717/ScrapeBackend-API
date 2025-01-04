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

// to get all books
fetchBookFromDBController.get("/all-books", getAllBooks);

// get books by title
fetchBookFromDBController.get("/books/title", getBooksByTitle);

//get books by price range
fetchBookFromDBController.get("/books/price-range", getBooksByPriceRange);

//get books by rating range
fetchBookFromDBController.get("/books/rating-range", getBooksByRatingsRange);

//get n books bt some limit i.e no. of books
fetchBookFromDBController.get("/books/limit", getBooksByLimit);

// get books by sorting in price and rating in ascending or descending order
fetchBookFromDBController.get("/books/sort", getBooksBySorting);

export { fetchBookFromDBController };
