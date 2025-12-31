const Article = require("../models/Article");
const searchTopBlogs = require("./googleSearch");
const scrapeExternalArticle = require("./externalScraper");
const rewriteArticle = require("./llmRewrite");
const withTimeout = require("../utils/withTimeout");

const updateSingleArticle = async (articleId) => {
  console.log("📄 Fetching article from DB");
  const article = await Article.findById(articleId);
  if (!article) throw new Error("Article not found");
  if (article.isUpdated) throw new Error("Article already updated");

  console.log("🔍 Searching Google");
  const references = await withTimeout(
    searchTopBlogs(article.title),
    10_000,
    "Google search"
  );

  console.log("📰 Scraping reference articles");
  const refContents = [];
  for (const ref of references) {
    const content = await withTimeout(
      scrapeExternalArticle(ref.url),
      10_000,
      "External scrape"
    );
    refContents.push(content);
  }

  console.log("🤖 Calling Gemini / Mistral");
  const updatedContent = await withTimeout(
    rewriteArticle(article.content, refContents[0], refContents[1]),
    20_000,
    "LLM rewrite"
  );

  console.log("💾 Saving updated article");
  article.updatedContent = updatedContent;
  article.references = references;
  article.isUpdated = true;
  await article.save();

  console.log("✅ Article updated successfully");
};

module.exports = updateSingleArticle;
