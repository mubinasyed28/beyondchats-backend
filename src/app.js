require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const scrapeOldestArticles = require("./services/scraper");

const app = express();

/* ✅ MIDDLEWARE MUST COME FIRST */
app.use(cors());
app.use(express.json());

/* ✅ TEST ROUTE */
app.post("/ping", (req, res) => {
  console.log("🏓 Ping hit");
  res.json({ message: "pong" });
});

/* ✅ DB */
connectDB();

console.log("🚦 Mounting article routes");
app.use("/api/articles", require("./routes/articleRoutes"));

app.get("/scrape", async (req, res) => {
  await scrapeOldestArticles();
  res.send("Scraping done");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));