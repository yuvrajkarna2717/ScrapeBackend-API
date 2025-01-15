import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: Number,
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
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
