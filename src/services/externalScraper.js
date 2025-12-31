const axios = require("axios");
const cheerio = require("cheerio");

const scrapeExternalArticle = async (url) => {
  const { data } = await axios.get(url, { timeout: 10000 });
  const $ = cheerio.load(data);

  const content = $("p")
    .map((_, el) => $(el).text().trim())
    .get()
    .join("\n\n");

  return content.slice(0, 1500); // keep token-safe
};

module.exports = scrapeExternalArticle;
