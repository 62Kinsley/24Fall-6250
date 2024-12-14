const loginWeb = {

    loginPage: function () {
        return `
            <!doctype html>
                <html>
                    <head>
                        <title>Login</title>
                        <link rel="stylesheet" href="/style.css">
                    </head>
                    <body>
                      <h1>Hi There!</h1>
                      <form method="POST" action="/login">
                        <label for="username">Username: </label>
                        <input type="text" id="username" name="username" placeholder="Please enter your name">
                        <button type="submit">Login</button>
                      </form>
                    </body>
                 </html>
    `;
    },

    homePage: function (session, storedWord) {
        return `
            <!doctype html>
                <html>
                    <head>
                        <title>Homepage</title>
                        <link rel="stylesheet" href="/style.css">
                    </head>
                    <body>
                        <h1>Welcome, ${session.username}</h1>
                        <p>Stored Word: ${storedWord}</p>
                    <form method="POST" action="/word">
                        <label for="word">New Word: </label>
                        <input type="text" id="word" name="word">
                        <button type="submit">Update</button>
                    </form>
                    <form method="POST" action="/logout">
                        <button type="submit">Logout</button>
                    </form>
                    </body>
                </html>
    `
    },

    errorPage: function (message) {
        return `
            <!doctype html>
                <html>
                    <head>
                        <title>Error</title>
                        <link rel="stylesheet" href="/style.css">
                    </head>
                    <body>
                        <p>${message}</p>
                        <a href="/">Return to home page</a>
                    </body>
                </html>
    `
    },

};

module.exports = loginWeb;