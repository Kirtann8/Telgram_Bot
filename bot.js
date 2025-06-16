//This Is Main Entry Point 
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const connectDB = require('./config/db');
const handleMessage = require('./controllers/messageHandler');

// Connect to DB
connectDB();

// Init bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  await handleMessage(bot, msg);
});
