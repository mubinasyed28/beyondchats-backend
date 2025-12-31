const { Mistral } = require("@mistralai/mistralai");

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY
});

const rewriteArticle = async (original, ref1, ref2) => {
  const prompt = `
Rewrite the original article using insights from the two reference articles.

Requirements:
- Improve clarity and structure
- Use headings or bullet points where helpful
- Keep the topic intact
- Do NOT copy text verbatim
- Make it readable and professional

ORIGINAL ARTICLE:
${original.slice(0, 800)}

REFERENCE ARTICLE 1:
${ref1.slice(0, 400)}

REFERENCE ARTICLE 2:
${ref2.slice(0, 400)}
`;

  const response = await client.chat.complete({
    model: "mistral-small-latest",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.6
  });

  return response.choices[0].message.content;
};

module.exports = rewriteArticle;
