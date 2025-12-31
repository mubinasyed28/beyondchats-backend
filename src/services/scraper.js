const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const BLOG_URL = "https://beyondchats.com/blogs/";

const scrapeOldestArticles = async () => {
  console.log("🔍 Fetching blog list...");

  const { data } = await axios.get(BLOG_URL);
  const $ = cheerio.load(data);

  const articleLinks = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("https://beyondchats.com/blogs/") && href.split("/").length > 5) {
      articleLinks.push(href);
    }
  });

  const uniqueLinks = [...new Set(articleLinks)].slice(-5);
  console.log("📰 Articles found:", uniqueLinks);

  for (const link of uniqueLinks) {
    console.log("➡ Scraping:", link);

    const articlePage = await axios.get(link);
    const $$ = cheerio.load(articlePage.data);

    // Multiple fallbacks
    const title =
      $$("h1").first().text().trim() ||
      $$("meta[property='og:title']").attr("content") ||
      $$("title").text().trim();

    const content =
      $$("article").text().trim() ||
      $$("div[class*='content']").text().trim() ||
      $$("body").text().trim();

    // ❗ Guard clause (VERY IMPORTANT)
    if (!title || title.length < 5) {
      console.log("⚠ Skipping article (title not found)");
      continue;
    }

    await Article.updateOne(
    { sourceUrl: link },
    {
        $set: {
        title,
        content,
        sourceUrl: link
        }
    },
    { upsert: true });

  console.log("🎉 Scraping completed");
};
};

module.exports = scrapeOldestArticles;
