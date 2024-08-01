const axios = require('axios');
const fs = require('fs');

module.exports = {
    config: {
        name: "spacei",
        aliases: ['s'],
        author: "Hassan",
        version: "1.0",
        shortDescription: "Get random space information",
        longDescription: "Fetch random space information from the provided API.",
        category: "utility",
        guide: {
            vi: "",
            en: ""
        }
    },

    onStart: async function ({ message }) {
        try {
            const url = 'https://hassan-space-aips.onrender.com/randomspace';

            message.reply('⏳ Fetching space information...');

            const response = await axios.get(url);

            if (response.data) {
                const { date, explanation, hdurl, media_type, service_version, title, url } = response.data;
                const dataToSend = {
                    date,
                    explanation,
                    hdurl,
                    media_type,
                    service_version,
                    title,
                    url
                };

                const filePath = './spaceInfo.json';
                fs.writeFileSync(filePath, JSON.stringify(dataToSend, null, 2));

                return message.reply({
                    body: `🌌 Space Information: ${title}\n📅 Date: ${date}\n📖 Explanation: ${explanation}\n🔗 ......................`,
                    attachment: fs.createReadStream(filePath)
                });
            } else {
                return message.reply("Sorry, no space information was found.");
            }
        } catch (error) {
            console.error(error);
            return message.reply("Sorry, there was an error fetching space information.");
        }
    }
};
