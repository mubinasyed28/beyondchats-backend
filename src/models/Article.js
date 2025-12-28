const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  content: { type: String },
  publishedAt: { type: Date },
  sourceUrl: { type: String, unique: true },
  isUpdated: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
