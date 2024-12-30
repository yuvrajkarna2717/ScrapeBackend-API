import Book from "../models/bookModel.js";

const saveScrapeBookDetailsToDB = async (allBookDetails) => {
  try {
    const savedBooks = await Book.insertMany(allBookDetails);
    return { message: "success" };
  } catch (error) {
    return { message: "error", error: error.message };
  }
};

export { saveScrapeBookDetailsToDB };
