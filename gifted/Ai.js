const { gmd } = require('../gift');
const axios = require('axios');
gmd({
  pattern: "giftedai",
  aliases: ["ai"],
  description: "Query AI model information from GiftedTech API",
  category: "Ai",
  filename: __filename
}, async (from, Gifted, conText) => {
  const { q, reply, GiftedTechApi, GiftedApiKey } = conText;

  try {
    const query = q || "Whats Your Model";
    const apiUrl = `${GiftedTechApi}/api/ai/ai?apikey=${GiftedApiKey}&q=${encodeURIComponent(query)}`;

    const res = await axios.get(apiUrl, { timeout: 100000 });
    const data = res.data;

    if (!data.success || !data.result) {
      return reply("❌ Failed to fetch AI model information.");
    }

    // Just reply with the result
    reply(data.result);

  } catch (err) {
    console.error("aimodel error:", err);
    reply("❌ Error fetching AI model info: " + err.message);
  }
});
