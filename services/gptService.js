const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.getSmartReply = async (prompt) => {
  try {
    const res = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    });
    return res.choices[0].message.content.trim();
  } catch (err) {
    console.error('GPT Error:', err.message);
    return "Oops, baby my brain glitched 😢";
  }
};
