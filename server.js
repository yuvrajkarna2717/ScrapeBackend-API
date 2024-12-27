import express from "express";
import { scrape } from "./scrape/scrape.js";

const app = express();
app.use(express.json());

app.get("/api/books", async (req, res) => {
  const noOfPages = req.params.noOfPages || 23;

  try {
    const allBooks = await scrape(noOfPages);
    res.status(201).send(allBooks);
  } catch (error) {
    console.error("Error scraping books:", error);
    res.status(500).send({ error: "Failed to scrape books" });
  }
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
