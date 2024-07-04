const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "niji",
    aliases: [],
    author: "Rafi",
    version: "1.0",
    cooldowns: 5,
    role: 2,
    shortDescription: {
      en: "Generate an anime image based on a prompt"
    },
    longDescription: {
      en: "This command generates an anime image based on a prompt using the Vyturex API."
    },
    category: "Image",
    guide: {
      en: "[userprompt]"
    }
  },

  generateImage: async function(prompt) {
    const apiUrl = `https://api.vyturex.com/niji?text=${encodeURIComponent(prompt)}`;
    try {
      const response = await axios.get(apiUrl);
      if (response.data && response.data.imageUrl) {
        return response.data.imageUrl;
      } else {
        throw new Error('Image URL not found in the response');
      }
    } catch (error) {
      console.error('Error generating image:', error.message);
      throw error;
    }
  },

  downloadImage: async function(url, filePath) {
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  },

  onStart: async function ({ api, event, args }) {
    const userPrompt = args.join(" ");
    const waitingMessage = await api.sendMessage("Generating your image, please wait...", event.threadID);

    try {
      const imageUrl = await module.exports.generateImage(userPrompt);
      const imagePath = path.join(__dirname, 'generated_image.png');

      await module.exports.downloadImage(imageUrl, imagePath);

      const message = {
        body: `Here is the generated image for your prompt: ${userPrompt}`,
        attachment: fs.createReadStream(imagePath)
      };
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(`Error generating image: ${error.message}`, event.threadID, event.messageID);
    }
  }
};
