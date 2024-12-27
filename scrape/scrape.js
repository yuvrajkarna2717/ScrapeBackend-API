import puppeteer from "puppeteer";

import dotenv from "dotenv";
dotenv.config();

const WEBSITE_URL = process.env.WEBSITE_URL || "https://books.toscrape.com";
async function scrape(totalPageNumber = 1) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let allBooks = [];
  let pageNumber = 1;

  while (pageNumber <= totalPageNumber) {
    const url = `${WEBSITE_URL}/catalogue/page-${pageNumber}.html`;
    await page.goto(url);

    const booksOnPage = await page.evaluate(() => {
      const bookElements = document.querySelectorAll(".product_pod");

      return Array.from(bookElements).map((book) => {
        const title = book.querySelector("h3 a").getAttribute("title");
        const price = book.querySelector(".price_color").textContent;
        const stock = book.querySelector(".instock.availability")
          ? "In Stock"
          : "Out Of Stock";
        const rating = book
          .querySelector(".star-rating")
          .className.split(" ")[1];
        const link =
          `https://books.toscrape.com/catalogue/` +
          book.querySelector("h3 a").getAttribute("href");

        return {
          title,
          price,
          stock,
          rating,
          link,
        };
      });
    });

    for (let book of booksOnPage) {
      await page.goto(book.link);
      const stockInfo = await page.evaluate(() => {
        const stockInfoElement = document.querySelector(
          ".instock.availability"
        );
        return stockInfoElement
          ? stockInfoElement.innerText.trim()
          : "Unknown Stock Info";
      });
      book.stockInfo = stockInfo;

      const imageLink = await page.evaluate(() => {
        const imageLinkElement = document.querySelector(".item.active");

        // Find the img tag within the selected element
        const imgElement = imageLinkElement.querySelector("img");

        // Get the src attribute of the img tag
        return imgElement ? imgElement.src : null;
      });
      book.imageLink = imageLink;
    }

    allBooks.push(...booksOnPage);
    pageNumber++;
  }

  await browser.close();
  return allBooks;
}

// try {
//   const result = await scrape(1);
// } catch (error) {
//   console.log("error", error);
// }

export { scrape };
