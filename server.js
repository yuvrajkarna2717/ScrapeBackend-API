import { app } from "./app.js";

const PORT = process.env.PORT || 5000;

// "/" it is just to give an idea that the project is up and running
app.get("/", (req, res) => {
  res.status(201).json({
    status: 201,
    message: `Welcome to ScrapeBackend-API, Here we are trying to build a backend with many api's fetching data from scrapping a website ${process.env.WEBSITE_URL}`,
    exampleData: [
      {
        title: "A Light in the Attic",
        price: "£51.77",
        stock: "In Stock",
        rating: "Three",
        link: "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
        stockInfo: "In stock (22 available)",
        imageLink:
          "https://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg",
        __v: 0,
        createdAt: {
          $date: "2024-12-30T07:09:30.914Z",
        },
        updatedAt: {
          $date: "2024-12-30T07:09:30.914Z",
        },
      },
    ],
    fun: "api's are working.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
