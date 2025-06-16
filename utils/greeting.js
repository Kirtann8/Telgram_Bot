const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning 🌅";
  else if (hour < 18) return "Good afternoon ☀️";
  else return "Good night 🌙";
};

module.exports = { getGreeting };
