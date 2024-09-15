const { MongoClient } = require('mongodb');

const uri = `${global.GoatBot.config.database.uriMongodb}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// List of allowed thread IDs and user IDs
const allowedThreadIds = ["8477100965634266", "61550007344647"]; // Add more thread IDs as needed
const allowedUserIds = ["100089286199594", "61550007344647"]; // Add more user IDs as needed

module.exports = {
  config: {
    name: "approve",
    version: "1.1", // Updated version
    role: "0",
    author: "Mahi--",
    cooldown: "5",
    longDescription: {
      en: "Group Approve, Disapprove, and List Command"
    },
    category: "Developer",
    guide: {
      en: "{pn} (add/remove/list) [thread ID]"
    }
  },

  onStart: async function ({ api, message, event, args, threadsData }) {
    try {
      if (!db) {
        return message.reply("Database not connected.");
      }

      const collection = db.collection('approvedThreads');

      const threadId = event.threadID;
      const senderId = event.senderID;

      // Check if the thread or user is allowed
      if (!allowedThreadIds.includes(threadId) && !allowedUserIds.includes(senderId)) {
        return message.reply("You do not have permission to use this command.");
      }

      if (args.length < 1) {
        message.reply("You must provide an action: !approve (add/remove/list) [thread ID]");
        return;
      }

      const action = args[0];

      if (action === "add") {
        const targetThreadId = args[1];
        const threadData = await threadsData.get(targetThreadId);
        const threadName = threadData.threadName;

        const existingThread = await collection.findOne({ _id: targetThreadId });
        if (!existingThread) {
          await collection.insertOne({ _id: targetThreadId, threadName, status: "approved" });
          message.reply(`🍁 | Group: ${threadName}\n🆔 | TID: ${targetThreadId}\n✅ | Status: Approved!`);
        } else {
          message.reply(`🍁 | Group: ${threadName}\n🆔 | TID: ${targetThreadId}\n✅ | Status: Already Approved!`);
        }
      } else if (action === "remove") {
        const targetThreadId = args[1];
        const threadData = await threadsData.get(targetThreadId);
        const threadName = threadData.threadName;

        await collection.updateOne({ _id: targetThreadId }, { $set: { status: "disapproved" } });
        message.reply(`🍁 | Group: ${threadName}\n🆔 | TID: ${targetThreadId}\n❎ | Status: Disapproved!`);
      } else if (action === "list") {
        // List all approved groups
        const approvedThreads = await collection.find({ status: "approved" }).toArray();

        if (approvedThreads.length === 0) {
          return message.reply("There are no approved groups.");
        }

        let replyMessage = "📋 | Approved Groups List:\n";
        approvedThreads.forEach(thread => {
          replyMessage += `🍁 | Group: ${thread.threadName}\n🆔 | TID: ${thread._id}\n\n`;
        });

        message.reply(replyMessage.trim());
      } else {
        message.reply("Invalid action. Please use: !approve (add/remove/list) [thread ID]");
      }
    } catch (err) {
      console.error("Error in onStart function:", err);
      message.reply("An error occurred while processing your request.");
    }
  },

  onChat: async function () {
    try {
      if (!db) {
        await client.connect();
        db = client.db('Approve'); // Store the database reference
        console.log("Connected to MongoDB successfully.");
      }
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  }
};
