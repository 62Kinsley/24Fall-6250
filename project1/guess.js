const sessions = {}; 
const userGames = {}; 
const words = require('./words');

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
 
function isValidUsername(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

function countMatches(guess, secretWord) {
    const guessLetters = guess.split('');
    const secretLetters = secretWord.split('');
    let matchCount = 0;
  
    guessLetters.forEach(letter => {
      if (secretLetters.includes(letter)) {
        matchCount++;
        secretLetters.splice(secretLetters.indexOf(letter), 1);
      }
    });
  
    return matchCount;
}

module.exports = {
  sessions,
  userGames,
  getRandomWord,
  isValidUsername,
  countMatches,
};