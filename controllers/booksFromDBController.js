// Return all book details
const getAllBooks = async (req, res) => {
  res.status(201).json({ message: "all books fetched." });
};

// Fetch books by title (query: title=attice)
const getBooksByTitle = async (req, res) => {
  res.status(201).json({ message: "books fetched by title." });
};

// Fetch books by price range (query: minPrice=x, maxPrice=y)
const getBooksByPriceRange = async (req, res) => {
  res.status(201).json({ message: "books fetched between max and min price." });
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
