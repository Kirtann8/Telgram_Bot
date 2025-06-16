exports.getRandomImage = () => {
  const romanticImages = [
    'https://i.imgur.com/Uz4F1GE.jpg',
    'https://i.imgur.com/W8nLSeD.jpg',
    'https://i.imgur.com/JduSx4D.jpg',
  ];
  return romanticImages[Math.floor(Math.random() * romanticImages.length)];
};

exports.getRandomAudio = () => {
  return 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
};
