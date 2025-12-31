console.log("📦 articleRoutes loaded");

const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleController");
const updateSingleArticle = require("../services/updateArticlePipeline");

// Phase 1 – CRUD
router.post("/", controller.createArticle);
router.get("/", controller.getArticles);
router.get("/:id", controller.getArticleById);
router.put("/:id", controller.updateArticle);
router.delete("/:id", controller.deleteArticle);

// Phase 2 – AI Update Pipeline
router.post("/:id/update", async (req, res) => {
  try {
    console.log("🔁 Phase 2 started for:", req.params.id);

    await updateSingleArticle(req.params.id);

    console.log("✅ Phase 2 completed");
    res.json({ message: "Article updated using LLM" });
  } catch (err) {
    console.error("❌ Phase 2 failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

