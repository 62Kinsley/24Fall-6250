const sessionStore = {}; 
const wordStore = {}; 

function createSession(sessionId, username) {
  sessionStore[sessionId] = {username}; 
}

function getSession(sessionId) {
  return sessionStore[sessionId]; 
}

function storeWord(username, word) {
  wordStore[username] = word || ''; 
}

function getStoredWord(username) {
  return wordStore[username] || ''; 
}

function deleteSession(sessionId) {
  delete sessionStore[sessionId]; 
}

module.exports = {
  sessionStore,
  wordStore,
  createSession,
  getSession,
  storeWord,
  getStoredWord,
  deleteSession
};