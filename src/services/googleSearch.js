const axios = require("axios");

const searchTopBlogs = async (query) => {
  const response = await axios.get("https://serpapi.com/search.json", {
    params: {
      q: query,
      engine: "google",
      api_key: process.env.SERP_API_KEY,
      num: 5
    },
    timeout: 10000
  });

  const results = response.data.organic_results || [];

  return results
    .filter(r => r.link && !r.link.includes("beyondchats.com"))
    .slice(0, 2)
    .map(r => ({
      title: r.title,
      url: r.link
    }));
};

module.exports = searchTopBlogs;
