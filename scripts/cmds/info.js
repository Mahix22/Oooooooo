const axios = require("axios");

module.exports = {
  config: {
    name: "info",
    aliases: ['owner', 'about', 'creator'],
    version: "1.0",
    author: "Mahi--",
    countDown: 5,
    role: 0,
    longDescription: "Provides information about Mahi",
    category: 'info',
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ message }) {
    const currentAuthor = "Mahi--";
    const infoMessage = `
𝗡𝗮𝗺𝗲: Mahi Ahmed  ❣
𝗦𝘂𝗿𝗻𝗮𝗺𝗲: Mahi
𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: Your  Dad👽
𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: 24/12/2004
𝗧𝗮𝘁𝘁𝗼𝗼𝘀: Nah, hate it 😐
𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: Married with Your Gf
𝗠𝘂𝘀𝗶𝗰 𝗢𝗿 𝗠𝗼𝘃𝗶𝗲𝘀: music 
𝗟𝗼𝗻𝗴𝗲𝘀𝘁 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽: Got married that's mean it will run forever  👀
𝗜𝗻𝘃𝗼𝗹𝘃𝗲𝗱 𝗶𝗻 𝗮𝗻 𝗮𝗰𝗰𝗶𝗱𝗲𝗻𝘁: Yh, 🥲
𝗕𝗮𝗻𝗸 balance: poor kid  🌚
𝗚𝗼𝘁 𝗜𝗻 𝗔 𝗦𝘁𝗿𝗲𝗲𝘁 𝗳𝗶𝗴𝗵𝘁: Last time few months ago
𝗗𝗼𝗻𝗮𝘁𝗲𝗱 𝗕𝗹𝗼𝗼𝗱: No
𝗙𝗮𝘃𝗼𝘂𝗿𝗶𝘁𝗲 𝗗𝗿𝗶𝗻𝗸: 7up ⚽ 
𝗕𝗿𝗼𝗸𝗲 𝗦𝗼𝗺𝗲𝗼𝗻𝗲'𝘀 𝗛𝗲𝗮𝗿𝘁: Once (now she's my wife)
𝗚𝗼𝘁 𝗔𝗿𝗿𝗲𝘀𝘁𝗲𝗱: many time
    `;
    const gifs = [
      "https://i.ibb.co/JpJmFsZ/image.jpg", 
      "https://i.ibb.co/SrshqWM/image.jpg"
    ];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    // Anti-author change system (obfuscated)
    (function() {
      const e = module.exports.config;
      const a = currentAuthor;
      const n = e.author;
      if (n !== a) {
        const r = new Error("Unauthorized author change detected!");
        throw r;
      }
    })();

    try {
      const gifStream = await axios.get(randomGif, { responseType: 'stream' }).then(res => res.data);
      await message.reply({
        body: infoMessage,
        attachment: gifStream
      });
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while sending the information.");
    }
  }
};
