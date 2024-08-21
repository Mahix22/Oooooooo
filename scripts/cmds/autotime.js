const moment = require('moment-timezone');

module.exports.config = {
  name: "autotime",
  version: "2.0.0",
  role: 0,
  author: "kylepogi",//don't change the author kung ayaw mong ma pwetan!! 
  description: "Automatically sends messages based on set times.",
  category: "AutoTime",
  countDown: 3
};

module.exports.onLoad = async ({ api }) => {
  const arrayData = {
     "12:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 12:00 𝐏𝐌\n\n📌 good afternoon everyone don't forget to eat lunch break🍛"
      },
      "01:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 01:00 𝐀𝐌\n\n📌 good morning everyone!!, have a nice morning babe🍞☕🌅"
      },
      "02:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 02:00 𝐀𝐌\n\n📌 don't forget to add/follow my owner babe☺.\n\n📩:https://www.facebook.com/profile.php?id=100089286199594"

      },
      "03:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 03:00 𝐀𝐌\n\n📌 what happened babe🌸"
        
      },
      "04:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 04:00 𝐀𝐌\n\n📌  eyyy🤙don't panic babe it's organic eyyyyy🤙"

      },
      "05:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 05:00 𝐀𝐌\n\n📌 aga nyo nagising ahh sanaol strong💀🙏"
        
      },
      "06:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 06:00 𝐀𝐌\n\n📌 bacchara ki koro"
        
      },
      "07:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 07:00 𝐀𝐌\n\n📌 don't forget to eat y'all breakfast!!ok babe🍞☕🍛"
        
      },
      "08:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 08:00 𝐀𝐌\n\n📌 life update: Talk my owner "
        
      },
      "09:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 09:00 𝐀𝐌\n\n📌 ummmmmaaah babe💀🙏"
        
      },
      "10:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 10:00 𝐀𝐌\n\n📌 wag mo kalimutan e chat owner ko💀🙏"
        
      },
      "11:00:00 AM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 11:00 𝐀𝐌\n\n📌  hinde mababawasan kapogian ng owner ko, btw have a nice morning everyone!!"
        
      },
      "12:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 12:00 𝐏𝐌\n\n📌  এখন দুপুর ১২টা বাজে গোসল করে সবাই জোহরের নামাজ পড়ে যাও💀"
        
      },
      "01:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 01:00 𝐏𝐌\n\n📌 dont forget to eat y'all launchbreak😸"
        
      },
      "02:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 02:00 𝐏𝐌\n\n📌 good afternoon!!,এখন দুপুর ২টা বাজে সবাই দুপুরের খাবার খেয়ে নাও😎 "
        
      },
      "03:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 03:00 𝐏𝐌\n\n 📌 এখন দুপুর ৩টা বাজে সারাদিন কাজ করছো এবার একটু ঘুমাও:("
        
      },
      "04:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 04:00 𝐏𝐌\n\n📌 এখন বিকাল ৪টা বাজে বড়দের স্কুল ছুটি দিয়ে দিছে চল মেয়ে দেখে আসি😸"
        
      },
      "05:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 05:00 𝐏𝐌\n\n📌 এখন বিকাল ৫টা বাজে একটু পর আসরের আযান দিবে সবাই নামাজ পড়ে নিও 😎"
        
      },
      "06:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 06:00 𝐏𝐌\n\n📌 এখন সন্ধ্যা ৬টা বাজে মাগরিবের আযান দিলে সবাই নামাজ পড়ে নাও🥀 নামাজ পড়ে বাড়িতে এসে কিছু খেয়ে নাও এবং পরিবারের সাথে সময় কাটাও🙏"
        
      },
      "07:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 07:00 𝐏𝐌\n\n📌 এখন সন্ধ্যা ৭ টা বাজে নামাজ শেষ করে সবাই বই নিয়ে পড়তে বসো😎"
        
      },
      "08:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 08:00 𝐏𝐌\n\n📌 এখন রাত ৮টা বাজে একটু পর এশারের আযান দিবে সবাই নামাজ পড়ে নাও❤️"
        
      },
      "09:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 09:00 𝐏𝐌\n\n📌 Talk to my Admin Babe💦😸"
        
      },
      "10:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 10:00 𝐏𝐌\n\n📌 এখন রাত ১০টা বাজে সবাই রাতের খাবার খেয়ে ঘুমাও💀🙏"
        
      },
      "11:00:00 PM": {
        message: "🔔 𝗔𝘂𝘁𝗼 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ time now - 11:00 𝐏𝐌\n\n📌 এখন রাত 11টা বাজে সবাই ঘুমায় পড়ো আমার বউ নাই ভাই তাই ঘুম ও আসে না."
      }

    // Add more messages for other times as needed
  };

  const checkTimeAndSendMessage = () => {
    const now = moment().tz('Asia/Dhaka');
    const currentTime = now.format('hh:mm:ss A');

    const messageData = arrayData[currentTime];

    if (messageData) {
      const tid = global.db.allThreadData.map(i => i.threadID);
      tid.forEach(async (threadID, index) => {
        api.sendMessage({ body: messageData.message }, threadID);
      });
    }

    const nextMinute = moment().add(1, 'minute').startOf('minute');
    const delay = nextMinute.diff(moment());
    setTimeout(checkTimeAndSendMessage, delay);
  };

  checkTimeAndSendMessage();
};

module.exports.onStart = () => {};
