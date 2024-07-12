const fetch = require('node-fetch');

module.exports = {
 config: {
 name: "gist",
 version: "1.0",
 author: "Rafi",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "Uploads text to a GitHub Gist and sends the raw link."
 },
 longDescription: {
 en: "This command uploads text to a GitHub Gist and sends the raw link of the uploaded file."
 },
 category: "Tools",
 guide: {
 en: "To use this command, type !gist <text>. It will upload the provided text to a GitHub Gist."
 }
 },

 onStart: async function ({ api, args, event, message }) {
 if (args.length === 0) {
 message.reply('Please provide some text to upload to GitHub Gist.', event.threadID);
 return;
 }

 const text = args.join(' ');
 const apiUrl = `https://gist-zeta.vercel.app/upload?text=${encodeURIComponent(text)}`;

 try {
 const response = await fetch(apiUrl);
 if (!response.ok) {
 throw new Error(`Failed to upload text to GitHub Gist. Status: ${response.status}`);
 }

 const json = await response.json();
 const rawLink = json.rawLink;

 message.reply(`Text uploaded to GitHub Gist: ${rawLink}`, event.threadID);
 } catch (error) {
 console.error('Error uploading text to GitHub Gist:', error);
 message.reply('Failed to upload text to GitHub Gist.', event.threadID);
 }
 }
};
