const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());


app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  const userlist = sessions.getUserList();
  res.json({
    username,
    userlist
  });
});

app.post('/api/v1/session', (req, res) => {
  const {
    username
  } = req.body;

  if (!users.isValidUsername(username)) {
    console.log(username);
    res.status(400).json({
      error: 'required-username'
    });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({
      error: 'auth-insufficient'
    });
    return;
  }

  setTimeout(function () {
    const sid = sessions.addSession(username);

    res.cookie('sid', sid);

    const userlist = sessions.getUserList();
    res.json({
      username,
      userlist
    });
  }, 1000)
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({
    wasLoggedIn: !!username
  });
});


app.get('/api/v1/messages', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }

  res.json(users.messages);
});


app.put('/api/v1/messages', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }

  const {
    message
  } = req.body;

  if (!message || message.trim === '') {
    res.status(400).json({
      error: 'required-message'
    });
    return;
  }

  users.addMessage({
    sender: username,
    text: message
  });

  res.json(users.messages);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));