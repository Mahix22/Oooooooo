const axios = require('axios');
const fs = require('fs');
const path = require('path');

const MAX_FILE_SIZE_MB = 84;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

module.exports = {
  config: {
    name: "dlz",
    version: "1.0",
    author: "Kaizenji",//don't change the credits, i will destroy your country!!
    category: "media",
    aliases: ["dl"],
    countDown: 10,
    role: 0,
    shortDescription: "Download content by link",
    longDescription: { en: "Download video content using link from Facebook, Instagram, TikTok" },
    category: "media",
    guide: "{pn} <url>"
  },

  onStart: async function ({ message, args }) {
    const link = args.join(" ");
    if (!link) {
      return message.reply("Please provide a link.");
    }

    let BASE_URL;
    if (link.includes("facebook.com") || link.includes("instagram.com")) {
      BASE_URL = `https://kaizenji-rest-api.onrender.com/igfb?url=${encodeURIComponent(link)}`;
    } else if (link.includes("tiktok.com")) {
      BASE_URL = `https://kaizenji-rest-api.onrender.com/tiktok2?url=${encodeURIComponent(link)}`;
    } else {
      return message.reply("Unsupported source.");
    }

    try {
      await message.reply("Downloading video, please wait...");

      const res = await axios.get(BASE_URL);
      let contentUrl;

      if (link.includes("facebook.com") || link.includes("instagram.com")) {
        contentUrl = link.includes("facebook.com") ? res.data.hdUrl || res.data.sdUrl : res.data.videoUrl;
      } else if (link.includes("tiktok.com")) {
        contentUrl = res.data.videoUrl;
      }

      if (!contentUrl) {
        return message.reply("No downloadable content found.");
      }

      const response = await axios.get(contentUrl, { responseType: 'arraybuffer' });

      if (response.data.length > MAX_FILE_SIZE_BYTES) {
        return message.reply("The file size exceeds the 84 MB limit.");
      }

      const filePath = path.join(__dirname, 'tmp', `${Date.now()}.mp4`);
      fs.writeFileSync(filePath, Buffer.from(response.data));

      await message.reply({
        body: "Download successfully!",
        attachment: fs.createReadStream(filePath)
      });

    } catch (error) {
      console.error(error);
      message.reply("Sorry, an error occurred while processing your request.");
    }
  }
};
