 const User = require('../models/User');
const { getGreeting } = require('../utils/greeting');
const { generateReply } = require('../services/replyServices');

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  let user = await User.findOne({ chatId });
  if (!user) {
    user = await User.create({ chatId, name: msg.from.first_name });
    await bot.sendMessage(chatId, `Hi ${msg.from.first_name} 😍 I'm your virtual girlfriend. Type anything!`);
    return;
  }

  if (text === "/start") {
    await bot.sendMessage(chatId, `${getGreeting()}, ${user.name} 💕 How’s your day?`);
  } else if (text.startsWith("/note ")) {
    const note = text.replace("/note ", "");
    user.notes.push(note);
    await user.save();
    await bot.sendMessage(chatId, `Okay baby, I noted: "${note}" 📝`);
  } else if (text === "/notes") {
    if (user.notes.length === 0) {
      await bot.sendMessage(chatId, "You haven’t told me anything to remember yet 😢");
    } else {
      await bot.sendMessage(chatId, `Here’s what I remember 🧠:\n- ${user.notes.join("\n- ")}`);
    }
  } else {
    const reply = generateReply(text);
    await bot.sendMessage(chatId, reply);
  }
};
