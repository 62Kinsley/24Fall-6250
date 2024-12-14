const guessWeb = {

    loginPage: function() {
        return `
            <!doctype html>
            <html>
                <head>
                <title>Login</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <div class="container">
                        <h1>Word Guessing Game</h1>
                        <p>Please log in to start playing</p>
                        <form action="/login" method="POST">
                        <label for="username">Username: </label>
                        <input type="text" id="username" name="username" required placeholder="Enter your username" />
                        <button type="submit">Login</button>
                        </form>
                    </div>
                </body>
            </html>
    `;
    },

    loginErrorPage: function (messages) {
        return `
            <!doctype html>
                <html>
                    <head>
                    <title>LoginError</title>
                        <link rel="stylesheet" href="/style.css">
                    </head>
                    <body>
                        <div class="container">
                            <p>${messages}</p>
                            <form action="/login" method="POST">
                            <input type="text" name="username" required placeholder="Enter your username..." />
                            <button type="submit">Login</button>
                            </form>
                        </div>
                    </body>
                </html>
    
    `
    },

    homePage: function (username, possibleWords, attempts,guessListHTML,lastGuess,message) {
        return `
            <!doctype html>
            <html>
                <head>
                <title>HomePage</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <div class="container">
                    <h1>Word Guessing Game</h1>
                    <p>Welcome back, ${username}!</p>
                    <p>Secret word is one of: ${possibleWords.join(', ')}</p>
                    <p>You have made ${attempts} valid guesses</p>
                    ${guessListHTML}
                    <p>You entered ${lastGuess}</p>
                    <p>${message}</p>
                    <form action="/guess" method="POST">
                        <input type="text" name="guess" required placeholder="Enter your guess here..." />
                        <button type="submit">Submit Guess</button>
                    </form>
                    <form action="/new-game" method="POST">
                        <button type="submit">Start New Game</button>
                    </form>
                    <form action="/logout" method="POST">
                        <button type="submit">Logout</button>
                    </form>
                    </div>
                </body>
            </html>
        `
    },

    guessPage: function () {
        return `
            <!doctype html>
            <html>
                <head>
                <title>GuessPage</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <div class="container">
                        <h1>Congratulations!</h1>
                        <p>You guessed the secret word: <strong>${game.secretWord}</strong></p>
                        <form action="/new-game" method="POST">
                        <button type="submit">Start New Game</button>
                        </form>
                        <form action="/logout" method="POST">
                        <button type="submit">Logout</button>
                        </form>
                    </div>
                </body>
            </html>
        `
    },

    validGuess: function(username,possibleWords,attempts,guessListHTML, guess, message){
        return `
      <!doctype html>
        <html>
          <head>
            <title>ValidGuess</title>
               <link rel="stylesheet" href="/style.css">
          </head>
          <body>
              <div class="container">
              <h1>Word Guessing Game</h1>
              <p>Welcome back, ${username}!</p>
              <p>Secret word is one of: ${possibleWords.join(', ')}</p>
              <p>You have made ${attempts} valid guesses</p>
               ${guessListHTML}
              <p>You entered ${guess}</p>
              <p>${message}</p>
              <form action="/guess" method="POST">
                  <input type="text" name="guess" required placeholder="Enter your guess here..." />
                  <button type="submit">Submit Guess</button>
              </form>
              <form action="/new-game" method="POST">
                  <button type="submit">Start New Game</button>
              </form>
              <form action="/logout" method="POST">
                  <button type="submit">Logout</button>
              </form>
              </div>
          </body>
       </html>
    `
    },

    invalidGuess: function(guess){
        return `
      <!doctype html>
        <html>
          <head>
            <title>Invalid Guess</title>
            <link rel="stylesheet" href="/style.css">
          </head>
          <body>
            <div class="container">
              <h1>Invalid Guess</h1>
              <p>You have already guessed the word: <strong>${guess}</strong>.</p>
              <form action="/" method="GET">
                <button type="submit">Go Back</button>
              </form>
            </div>
          </body>
        </html>
    `
    },

    correctGuess: function(secretWord){
        return `<!doctype html>
            <html>
                <head>
                <title>CorrectGuess</title>
                <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                <div class="container">
                    <h1>Congratulations!</h1>
                    <p>You guessed the secret word: <strong>${secretWord}</strong>.</p>
                    <form action="/new-game" method="POST">
                    <button type="submit">Start New Game</button>
                    </form>
                    <form action="/logout" method="POST">
                    <button type="submit">Logout</button>
                    </form>
                </div>
                </body>
            </html>
            `
    },
};

module.exports = guessWeb;