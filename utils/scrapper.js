import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

async function scrape() {
  const WEBSITE_URL = process.env.WEBSITE_URL;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let allBooks = [];
  let pageNumber = 1,
    totalPageNumber = 50;

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

async function scrapeSinglePage(pageNumber = 1) {
  return scrapeFromPageXToPageY(pageNumber, pageNumber);
}

async function scrapeFromPageXToPageY(pageX = 1, pageY = 2) {
  const WEBSITE_URL = process.env.WEBSITE_URL;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let allBookDetails = [];

  for (let bookPage = pageX; bookPage <= pageY; bookPage++) {
    const url = `${WEBSITE_URL}/catalogue/page-${bookPage}.html`;

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
    allBookDetails.push(...booksOnPage);
  }

  await browser.close();
  return allBookDetails;
}

// async function scrapeNBookDetails(n) {
//   const WEBSITE_URL = process.env.WEBSITE_URL;
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   let allBookDetails = [];
//   let bookPage = 1;

//   while (allBookDetails.length <= n) {
//     const url = `${WEBSITE_URL}/catalogue/page-${bookPage}.html`;

//     await page.goto(url);
//     const booksOnPage = await page.evaluate(() => {
//       const bookElements = document.querySelectorAll(".product_pod");

//       return Array.from(bookElements).map((book) => {
//         const title = book.querySelector("h3 a").getAttribute("title");
//         const price = book.querySelector(".price_color").textContent;
//         const stock = book.querySelector(".instock.availability")
//           ? "In Stock"
//           : "Out Of Stock";
//         const rating = book
//           .querySelector(".star-rating")
//           .className.split(" ")[1];
//         const link =
//           `https://books.toscrape.com/catalogue/` +
//           book.querySelector("h3 a").getAttribute("href");

//         return {
//           title,
//           price,
//           stock,
//           rating,
//           link,
//         };
//       });
//     });

//     for (let book of booksOnPage) {
//       await page.goto(book.link);
//       const stockInfo = await page.evaluate(() => {
//         const stockInfoElement = document.querySelector(
//           ".instock.availability"
//         );
//         return stockInfoElement
//           ? stockInfoElement.innerText.trim()
//           : "Unknown Stock Info";
//       });
//       book.stockInfo = stockInfo;

//       const imageLink = await page.evaluate(() => {
//         const imageLinkElement = document.querySelector(".item.active");

//         // Find the img tag within the selected element
//         const imgElement = imageLinkElement.querySelector("img");

//         // Get the src attribute of the img tag
//         return imgElement ? imgElement.src : null;
//       });
//       book.imageLink = imageLink;
//     }

//     allBookDetails.push(...booksOnPage);
//     if (allBookDetails.length <= n) break;
//     bookPage++;
//   }

//   await browser.close();
//   return allBookDetails;
// }

export { scrape, scrapeSinglePage, scrapeFromPageXToPageY };
