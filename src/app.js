require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const scrapeOldestArticles = require("./services/scraper");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/articles", require("./routes/articleRoutes"));

app.get("/scrape", async (req, res) => {
  await scrapeOldestArticles();
  res.send("Scraping done");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
