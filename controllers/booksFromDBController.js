import Book from "../models/bookModel.js";

// Return all book details
const getAllBooks = async (req, res) => {
  try {
    const result = await Book.find();
    if (!result || result.length <= 0) {
      return res.status(201).json({
        status: 201,
        message: "There is no book details in DB.",
        data: [],
      });
    }
    res
      .status(201)
      .json({ status: 201, message: "all books fetched.", data: result });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error." });
  }
};

// Fetch books by title
const getBooksByTitle = async (req, res) => {
  try {
    const { title } = req.query; // Extract the title from the query parameters

    if (!title) {
      return res.status(400).json({
        status: 400,
        message: "Title query parameter is required.",
      });
    }

    // Use a case-insensitive regex to find books with a matching title
    const books = await Book.find({
      title: { $regex: title, $options: "i" },
    });

    if (books.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No books found with the given title.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Books fetched successfully by title.",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error.",
    });
  }
};

// Fetch books by price range (query: minPrice=x, maxPrice=y)
const getBooksByPriceRange = async (req, res) => {
  try {
    let { minPrice, maxPrice } = req.query;

    console.log(
      "hello",
      req.query,
      minPrice,
      typeof minPrice,
      maxPrice,
      typeof maxPrice
    );

    // Convert query parameters to numbers
    minPrice = Number(minPrice);
    maxPrice = Number(maxPrice);

    if (!minPrice || isNaN(minPrice)) {
      return res
        .status(402)
        .json({ status: 402, message: "minPrice is required." });
    }
    if (!maxPrice || isNaN(maxPrice)) {
      return res
        .status(402)
        .json({ status: 402, message: "maxPrice is required." });
    }

    if (minPrice > maxPrice) {
      return res.status(402).json({
        status: 402,
        message: "minPrice must be lower than or equal to maxPrice.",
      });
    }

    const result = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    if (!result) {
      return res.status(200).json({
        status: 200,
        message: `There are no book details in between ${minPrice} & ${maxPrice}.`,
      });
    }

    res.status(200).json({
      status: 200,
      message: `All books details between ${minPrice} and ${maxPrice} are fetched.`,
      data: result,
    });
  } catch (error) {
    res.status(405).json({
      status: 405,
      message: error.message,
    });
  }
};

// Fetch books by ratings range (query: minRating=x, maxRating=y)
const getBooksByRatingsRange = async (req, res) => {
  res
    .status(201)
    .json({ message: "books fetched between max and min ratings." });
};

// Fetch limited number of books (query: limit=10)
const getBooksByLimit = async (req, res) => {
  res.status(201).json({ message: "books fetched with limit." });
};

// Fetch books sorted by price or rating (query: sortBy=price|rating, order=asc|desc)
const getBooksBySorting = async (req, res) => {
  res.status(201).json({ message: "books fetched as sorted by user request." });
};

export {
  getAllBooks,
  getBooksByTitle,
  getBooksByPriceRange,
  getBooksByRatingsRange,
  getBooksByLimit,
  getBooksBySorting,
};
