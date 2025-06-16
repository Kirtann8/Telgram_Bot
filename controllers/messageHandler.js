const User = require('../models/User');
const { getGreeting } = require('../utils/greeting');
const { generateReply } = require('../services/replyServices');
const { getSmartReply } = require('../services/gptService');
const { getRandomImage, getRandomAudio } = require('../utils/media');

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
    await bot.sendMessage(chatId, `${getGreeting()}, ${user.name} 💕 How's your day?`);
  } else if (text.startsWith("/note ")) {
    const note = text.replace("/note ", "");
    user.notes.push(note);
    await user.save();
    await bot.sendMessage(chatId, `Okay baby, I noted: "${note}" 📝`);
  } else if (text === "/notes") {
    if (user.notes.length === 0) {
      await bot.sendMessage(chatId, "You haven't told me anything to remember yet 😢");
    } else {
      const notesWithIndices = user.notes.map((note, index) => `${index + 1}. ${note}`);
      await bot.sendMessage(chatId, `Here's what I remember 🧠:\n${notesWithIndices.join('\n')}`);
    }
  } else if (text.startsWith("/forget ")) {
    const param = text.replace("/forget ", "");
    
    if (param.toLowerCase() === "all") {
      // Clear all notes
      const noteCount = user.notes.length;
      if (noteCount === 0) {
        await bot.sendMessage(chatId, "There's nothing to forget, sweetie 💕");
      } else {
        user.notes = [];
        await user.save();
        await bot.sendMessage(chatId, `I've forgotten everything for you, fresh start! 💖`);
      }
    } else {
      // Handle forgetting a specific note
      const index = parseInt(param) - 1; // Convert to 0-based index
      
      if (isNaN(index) || index < 0 || index >= user.notes.length) {
        await bot.sendMessage(chatId, "Sorry, I couldn't find that note 🤔 Use /notes to see all notes with their numbers.");
      } else {
        const forgottenNote = user.notes[index];
        user.notes.splice(index, 1); // Remove the note at the specified index
        await user.save();
        await bot.sendMessage(chatId, `Okay, I've forgotten about "${forgottenNote}" 💭`);
      }
    }
  } else {
    const reply = generateReply(text);
    await bot.sendMessage(chatId, reply);
  }

  // Set mode command
if (text.startsWith('@')) {
  const mode = text.replace('@', '').toLowerCase();
  const validModes = ['gf', 'motivation', 'jokes', 'gpt'];
  if (validModes.includes(mode)) {
    user.currentMode = mode;
    await user.save();
    await bot.sendMessage(chatId, `Mode changed to *${mode}* 💫`, { parse_mode: 'Markdown' });
  } else {
    await bot.sendMessage(chatId, `Available modes:\n@GF, @Motivation, @Jokes, @GPT`);
  }
  return;
}

// Smart replies by mode
if (user.currentMode === 'gpt') {
  const smartReply = await getSmartReply(text);
  return bot.sendMessage(chatId, smartReply);
}

if (user.currentMode === 'motivation') {
  const quotes = [
    "Believe in yourself 💪",
    "You are stronger than you think 🌟",
    "Never give up, baby ❤️",
  ];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  return bot.sendMessage(chatId, random);
}

if (user.currentMode === 'jokes') {
  const jokes = [
    "Are you Wi-Fi? Because I'm feeling a connection 😂",
    "Why did the bot date the user? Because it was programmed to love 😎",
  ];
  const random = jokes[Math.floor(Math.random() * jokes.length)];
  return bot.sendMessage(chatId, random);
}

// Image and audio
if (text.toLowerCase().includes("photo")) {
  return bot.sendPhoto(chatId, getRandomImage(), {
    caption: "Here's a sweet pic for you ❤️"
  });
}

if (text.toLowerCase().includes("music") || text.toLowerCase().includes("audio")) {
  return bot.sendAudio(chatId, getRandomAudio());
}


// Default GF mode
const reply = generateReply(text);
await bot.sendMessage(chatId, reply);
};
