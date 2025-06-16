# Telegram Girlfriend Bot

A virtual girlfriend bot for Telegram that remembers notes and responds to messages.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   TELEGRAM_TOKEN=your_telegram_bot_token_here
   MONGO_URI=mongodb://localhost:27017/telegram_bot
   ```

   - Get your Telegram bot token from [@BotFather](https://t.me/BotFather)
   - Set up MongoDB locally or use a service like [MongoDB Atlas](https://www.mongodb.com/atlas/database)

3. Run the bot:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## Commands

- `/start` - Begin conversation with the bot
- `/note [text]` - Save a note to remember
- `/notes` - List all saved notes with their numbers
- `/forget [number]` - Delete a specific note by its number
- `/forget all` - Delete all saved notes 