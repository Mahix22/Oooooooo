module.exports = {
  config: {
    name: "inbox",
    aliases: ["inboxme", "in"],
    version: "1.0",
    author: "RB-BADOL-KHAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "fun",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    },
    id: {
      gg: ""
    }
  },
  onStart: async function({ api, event, args, message }) {
    try {
       const attachment = await global.utils.getStreamFromURL("https://i.imgur.com/Wvri6gN.jpeg");
        await message.reply({ body: "╭━─━──━─━≪𝐈𝐍𝐁𝐎𝐗-𝐂𝐊≫━──━─━─━❯❯\n│\n│ 🌝স্যার আপনার ইনবক্সে গালি দিছি চেক দিয়েন🫂\n╰━─━──━─━≪𝐌𝐈𝐌-𝐁𝐎𝐓-𝟎𝟎𝟕≫━──━─━─━❯❯", attachment });
        await api.sendMessage("╭━─━──━─━≪𝐁𝐎𝐓-𝐍𝐀𝐌𝐄≫━──━─━─━❯❯\n│ 【•】𝐌𝐈𝐌-𝐁𝐎𝐓___//𝟎𝟎𝟕🟢⚪🔴🟡\n├━─━──━─━≪𝐇𝐄𝐋𝐏𝐈𝐍𝐆≫━──━─━─━❯❯\n│ যে কোন হেল্পের জন্য বট এডমিন কে নক করুন\n│ https://www.facebook.com/profile.php?id=100089286199594\n│m.me/100089286199594 \n│ 𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑-\n│ MAHI AHMED\n│ 𝐁𝐎𝐓-𝐀𝐃𝐌𝐈𝐍\n GOjO\n├━─━──━─━≪MAHI AI CHATBOT≫━──━─━─━❯❯\n│ SPRIHA V2🌸🟢\n╰━─━──━─━━──━─━─━❯❯", event.senderID);
    } catch (error) {
      console.error("Error bro: " + error);
    }
  }
};
