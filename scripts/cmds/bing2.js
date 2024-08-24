const axios = require('axios');
const { getStreamFromURL } = global.utils;
const rubishapi = global.GoatBot.config.rubishapi;

  module.exports = {
    config: {
      name: "bing2",
      aliases: ["dalle2"],
      version: "2.0",
      author: "RUBISH",
      shortDescription: {
        en: "An AI-based image generator using DALL·E 3 technology"
      },
      longDescription: {
        en: "Bing is an AI module that leverages the latest DALL·E 3 technology to generate images based on given prompts. It provides users with creative and unique images tailored to their inputs."
      },
      countDown: 30,
      role: 0,
      guide: {
        en: "{pn} 'prompt' ",
      },
      category: "AI",
    },
  

  onStart: async function ({ message, args }) {
    try {
      if (args.length === 0) {
        await message.reply("⚠️ | Please provide a prompt\n\nExample ► .dalle2 A beautiful Girl");
        return;
      }

      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      const apiKey = "rubish69";
      const cookies = [
        "1YRNbVpTNM56qrBooAKaKrMkV4-Z6Y-tngI1Ysu1cQPiOVqc7jSk_0nZLlE2QNIw6TTgq3GE7OHNPDyN6joejgcwpVSMA5zqrRMAu3vEtM51kU7QY3NWpeAv5H6b21EngKkwDy2O6KcZunuaWrXn14nDdW_bn6v3Y-7yBj0qQehbAuSNFmiOHI0L7HsKKJ01moOy6Y6ePNCPCOXTaPPMbUA", //ghost

 "1xAxM4jFd7zucMS1HZTq4oHtyY16ZH0xZsoN23iiqLbhAYRURcddvruLItCo2v8pG7yN_FOKAqrk0ks7y4v_sb3LMVJTW0o1YkJKKMQ9j2FcKWO6wOtpCZZJ_FJ4C5vMRwFlt97KosG6_n5_De3o1r8hNwtGLFwmTVyHK_djLa5f7zYe9o5PN9O-eSgd6bWPMBKx-xnEdfTG9PAsIJ9zL6w" //mahi
                       
]; 

      const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

      const apiURL = `${rubishapi}/dalle?prompt=${encodedPrompt}&cookie=${randomCookie}&apikey=${apiKey}`;

      const startTime = Date.now();
      const processingMessage = await message.reply(`
⏳ | Processing your imagination

Prompt: ${prompt}

Please wait a few seconds...`);

      const response = await axios.get(apiURL);

      const endTime = Date.now();
      const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

      const data = response.data;
      if (!data.imageLinks || data.imageLinks.length === 0) {
        if (data.errorMessage === "Invalid API key") {
          await message.reply("⚠️ | Invalid API key. Please check your API key and try again.");
        } else {
          await message.reply(`
⭕ | No images found for the 

Please try again.`);
        }
        return;
      }

      const attachment = await Promise.all(data.imageLinks.map(async (imgURL) => {
        const imgStream = await getStreamFromURL(imgURL);
        return imgStream;
      }));

      await message.reply({
        body: `
✅ | Here are the images for..

Prompt: "${prompt}" 

Processing Time: ${processingTimeInSeconds}s`,
        attachment: attachment,
      });

      message.unsend((await processingMessage).messageID);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        await message.reply("⚠️ | Unauthorized your API key \n\nContact with Rubish for a new apikey");
      } else if (error.response && error.response.data) {
        const responseData = error.response.data;

        if (responseData.errorMessage === "Pending") {
          await message.reply("⚠️ | This prompt has been blocked by Bing. Please try again with another prompt.");
        } else if (typeof responseData === 'object') {
          const errorMessages = Object.entries(responseData).map(([key, value]) => `${key}: ${value}`).join('\n');
          await message.reply(`⚠️ | Server error details:\n\n${errorMessages}`);
        } else if (error.response.status === 404) {
          await message.reply("⚠️ | The DALL·E-3 API endpoint was not found. Please check the API URL.");
        } else {
          await message.reply(`⚠️ | Rubish DALL·E-3 server busy now\n\nPlease try again later`);
        }
      } else {
        await message.reply("⚠️ | An unexpected error occurred. Please try again later.");
      }
    }
  }
};
