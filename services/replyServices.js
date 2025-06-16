const generateReply = text => {
  text = text.toLowerCase();
  if (text.includes('love')) return 'Awww, I love you too 💖';
  if (text.includes('sad')) return 'I’m here for you sweetheart 🫂';
  if (text.includes('joke'))
    return 'Why did we break up? Just kidding, we’re unbreakable 😘';
  return 'Tell me more, baby 😚';
};

module.exports = { generateReply };
