const axios = require('axios');

module.exports = {
  config: {
    name: "ffid",
    aliases: ["uidsearch"],
    version: "1.0",
    author: "Mahi--",
    countDown: 5,
    role: 0,
    shortDescription: "Fetch Free Fire user info by UID",
    longDescription: "Search for a Free Fire player's information using their UID.",
    category: "info",
    guide: {
      en: "{pn} <UID>\n\nExample:\n{prefix}{pn} 2621646004"
    }
  },

  onStart: async function ({ api, message, args, event }) {
    const { threadID, messageID } = event;

    // Check if a UID was provided
    if (args.length === 0) {
      return api.sendMessage("Please provide a UID.", threadID, messageID);
    }

    // Get the UID from the arguments
    const uid = args[0];

    // API parts
    const part1 = "https://ff";
    const part2 = ".lxonfire";
    const part3 = ".workers";
    const part4 = ".dev/?id=";

    // Construct the full API URL
    const apiUrl = `${part1}${part2}${part3}${part4}${encodeURIComponent(uid)}`;

    try {
      // Make the API request
      const response = await axios.get(apiUrl);
      const { img_url, region, nickname, open_id } = response.data;

      // Format the information
      const infoMessage = `
        🔥 Free Fire User Info 🔥
        📛 Nickname: ${nickname}
        🌍 Region: ${region}
        🔑 Open ID: ${open_id}
        `;

      // Send the response message with the image
      return api.sendMessage({
        body: infoMessage,
        attachment: await global.utils.getStreamFromURL(img_url)
      }, threadID, messageID);
      
    } catch (error) {
      console.error("Error fetching Free Fire user info:", error);
      return api.sendMessage("An error occurred while fetching the user info.", threadID, messageID);
    }
  }
};
