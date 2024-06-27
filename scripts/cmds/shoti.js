const path = require("path");

const axios = require("axios");

const fs = require("fs");


module.exports = {

config: {

  name: "shoti",

  version: "1.0.1",

  author: "kinastang eugene",

  aliases: ["st"],

  longDescription: { en: "Generate random shoti "},

  category: "fun",

  countDown: 5,

  role: 0,

},


onStart: async function ({ api, event, args }) {

  try {


const prompt = args.join(" ");
const { messageID, threadID } = event;


  if (!prompt[0]) { api.sendMessage("๑ | Downloading shoti...", threadID, messageID);

    }


    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);


      const response = await axios.post(`https://shoti-cutieapi.onrender.com/api/request/f`);


      const video = response.data.data.eurixmp4;

      const username = response.data.data.username;

      const nickname = response.data.data.nickname;

      const title = response.data.data.title;


      const videoPath = path.join(__dirname, "cache", "eabab.mp4");


      const videoResponse = await axios.get(video, { responseType: "arraybuffer" });


      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data));



        api.setMessageReaction("✅", event.messageID, (err) => {}, true);



      await api.sendMessage(

        {

          body: `Username: ${username}\nNickname: ${nickname}\nTitle: ${title}`,

          attachment: fs.createReadStream(videoPath),

        },

        event.threadID,

        event.messageID

      );

    fs.unlinkSync(videoPath);

  } catch (error) {

    api.sendMessage(`error: ${error.message}`, event.threadID, event.messageID);

    console.log(error);

  }

}

};
