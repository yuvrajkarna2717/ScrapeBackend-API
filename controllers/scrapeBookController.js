import { saveScrapeBookDetailsToDB } from "../utils/helper.js";
import { scrape } from "../utils/scrapper.js";

const scrapeBookDetailsAndSaveToDB = async (req, res) => {
  try {
    const allBooksDetails = await scrape();

    const result = await saveScrapeBookDetailsToDB(allBooksDetails);

    if (result.message === "success") {
      res.status(201).json({
        success: "successfully store all the scraped book details to DB.",
      });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { scrapeBookDetailsAndSaveToDB };
