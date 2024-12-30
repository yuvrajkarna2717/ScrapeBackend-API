import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    stockInfo: {
      type: String,
    },
    imageLink: {
      type: String,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
