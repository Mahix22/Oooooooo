const axios = require('axios');

module.exports = {
config: {
    name: "gemini2",
version: "1.0.0",
    author: "chill",//convert by kaizenji
    longDescription: {en: "Interact with Gemini"},
    role: 0,
    aliases: ["gemi2"],
    category: "ai",
    countDown: 5,
},

onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage('This cmd only works in photo.', event.threadID, event.messageID);
    }

    if (event.type !== "message_reply" || !event.messageReply.attachments[0] || event.messageReply.attachments[0].type !== "photo") {
        return api.sendMessage('Please reply to a photo with this command.', event.threadID, event.messageID);
    }

    const url = encodeURIComponent(event.messageReply.attachments[0].url);
    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('𝑮𝑬𝑴𝑰𝑵𝑰\n━━━━━━━━━━━━━━━━━━\nGemini recognizing picture, please wait...\n━━━━━━━━━━━━━━━━━━', event.threadID);

        const response = await axios.get(`https://ggwp-yyxy.onrender.com/gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
        const description = response.data.gemini;

        return api.sendMessage(`${description}`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('❌ | An error occurred while processing your request.', event.threadID, event.messageID);
    }
}
};
