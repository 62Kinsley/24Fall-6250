const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4= require('crypto').randomUUID;

const loginWeb = require('./login-web'); 
const { createSession, getSession, storeWord, getStoredWord, deleteSession } = require('./login');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));


app.get('/', (req, res) => {
  const sessionId = req.cookies.sid;
  const session = getSession(sessionId);
  if (!session) {
    res.send(loginWeb.loginPage());
  } else {
    const storedWord = getStoredWord(session.username);
    res.send(loginWeb.homePage(session, storedWord));
  }
});


app.post('/login', (req, res) => {
  const  username  = req.body.username.trim();  
  if (!username) {
    res.status(400).send(loginWeb.errorPage('400 Invalid Username'));
    return;
  } else if (username === 'dog') {
    res.status(403).send(loginWeb.errorPage('403 User not allowed'));
    return;
  }else if (/[#$%@]/.test(username)) {
    res.status(400).send(loginWeb.errorPage('400 Invalid Username'));
    return;
  } 
  const sessionId = uuidv4(); 
  createSession(sessionId, username);
  res.cookie('sid', sessionId);
  res.redirect('/');
  
});


app.post('/word', (req, res) => {
  const sessionId = req.cookies.sid;
  const session = getSession(sessionId);
  if (!session) {
    res.redirect('/');
  } else {
    const { word } = req.body;
    storeWord(session.username, word);
    res.redirect('/');
  }
});


app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  deleteSession(sessionId);
  res.clearCookie('sid');
  res.redirect('/');
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

