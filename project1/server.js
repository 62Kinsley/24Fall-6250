const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require('crypto').randomUUID;
const app = express();
const port = 3000;

const words = require('./words');
const guessWeb = require('./guess-web');
const {sessions,userGames,getRandomWord,isValidUsername,countMatches,} = require('./guess');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));


app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.send(guessWeb.loginPage());
  }
  const username = sessions[sid];
  const game = userGames[username];
  const lastGuess = game.guesses.length && game.guesses[game.guesses.length - 1] || ""; 
  const message = "" + countMatches(lastGuess, game.secretWord) + " letters matched";

  let guessListHTML = '<ul>';
  for (let guess of game.guesses) {
    const matchCount = countMatches(guess, game.secretWord);
    guessListHTML += `<li>${guess} - Matches: ${matchCount}</li>`;
  }
  guessListHTML += '</ul>';
  return res.send(guessWeb.homePage(username,game.possibleWords,game.attempts,guessListHTML,lastGuess,message));
});


app.post('/login', (req, res) => {
  const username = req.body.username;
  if (!isValidUsername(username)) {
    return res.send(guessWeb.loginErrorPage('Invalid username :( Please try again:'));
  }
  if (username === 'dog') {
    return res.send(guessWeb.loginErrorPage('Access denied for user dog :(  Please try again:'));
  }
  const sid = uuidv4();
  res.cookie('sid', sid);
  sessions[sid] = username;

  if (!userGames[username]) {
    userGames[username] = {
      secretWord: getRandomWord(),
      guesses: [],
      attempts: 0,
      possibleWords: [...words]
    };
    console.log(`New game started for ${username}, secret word is ${userGames[username].secretWord}`);
  }
  res.redirect('/');
});



app.post('/guess', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.redirect('/');
  }
  const username = sessions[sid];
  const game = userGames[username];
  const guess = req.body.guess.toLowerCase();

  if (!game.possibleWords.includes(guess)) {
    let guessListHTML = '<ul>';
    for (let guess of game.guesses) {
      const matchCount = countMatches(guess, game.secretWord);
      guessListHTML += `<li>${guess} - Matches: ${matchCount}</li>`;
    }
    guessListHTML += '</ul>';
    const message = "--- Attention: invalid guess!!---";
    return res.send(guessWeb.validGuess(username,game.possibleWords,game.attempts,guessListHTML,guess,message));
  }

  if (game.guesses.includes(guess)) {
    return res.send(guessWeb.invalidGuess(guess));
  }
  game.guesses.push(guess);
  game.attempts++; 
  game.possibleWords.splice(game.possibleWords.indexOf(guess),1);

  if (guess === game.secretWord) {
    return res.send(guessWeb.correctGuess(game.secretWord));
  }
  return res.redirect('/');
});


app.post('/new-game', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.redirect('/');
  }
  const username = sessions[sid];
  userGames[username] = {
    possibleWords: [...words],
    secretWord: getRandomWord(),
    guesses: [],
    attempts: 0
  };
  console.log(`New game started for ${username}, secret word is ${userGames[username].secretWord}`);
  res.redirect('/');
});


app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    delete sessions[sid];
  }
  res.clearCookie('sid');
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Word Guessing Game running at http://localhost:${port}`);
});
