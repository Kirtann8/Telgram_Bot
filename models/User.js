const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    chatId: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
    },
    mood: String,
    notes: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
