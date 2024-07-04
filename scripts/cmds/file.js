const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
    config: {
        name: "file",
        version: "1.0",
        author: "Cliff",
        countDown: 5,
        role: 0,
        shortDescription: "Send bot script",
        longDescription: "Send bot specified file",
        category: "𝗢𝗪𝗡𝗘𝗥",
        guide: "{pn} file name. Ex: .{pn} filename"
    },

    onStart: async function ({ message, args, api, event }) {
        const permission = ["100089286199594"];
        if (!permission.includes(event.senderID)) {
            return api.sendMessage("You don't have permission to use this command. 🐤", event.threadID, event.messageID);
        }

        const fileName = args[0];
        if (!fileName) {
            return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
        }

        const filePath = path.resolve(__dirname, `${fileName}.js`);
        if (!fs.existsSync(filePath)) {
            return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
        }

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const response = await axios.get(`https://hastebinupload-ghost-2de6112e.vercel.app/hastebin?upload=${encodeURIComponent(fileContent)}`);
            const php = response.data.php;
            const csharp = response.data.csharp;
            const js = response.data.js;
            const css = response.data.css;
            const ts = response.data.ts;
            const uploadMessage = "𝗨𝗣𝗟𝗢𝗔𝗗 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬";
            api.sendMessage(`${uploadMessage}\n\n${php}\n${csharp}\n${ts}\n${css}\n${js}`, event.threadID, event.messageID);
        } catch (error) {
            console.error('Error:', error);
            api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
        }
    }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
