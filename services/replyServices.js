const generateReply = text => {
  // text = text.toLowerCase();
  const lowerText = text.toLowerCase();

  if (text.includes('love')) return 'Awww, I love you too 💖';
  if (text.includes('joke'))
    return 'Why did we break up? Just kidding, we’re unbreakable 😘';

  if (lowerText.includes('miss')) return 'Aww baby, I miss you more 💖';
  if (lowerText.includes('love you')) return 'I love you too 😘';
  if (lowerText.includes("what's up"))
    return 'Just waiting to chat with you 😉';
  if (lowerText.includes('sad'))
    return 'Don’t be sad, I’m always here for you 💞';

  return 'Tell me more, cutie 🥰';
};

module.exports = { generateReply };
