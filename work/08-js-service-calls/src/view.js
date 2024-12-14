import { login, logout, updateWord, fetchWord } from './services.js';
import { setSession, clearSession, setError, setStoredWord, getState } from './state.js';


export function render() {
  const state = getState();
  const app = document.getElementById('app');

  if (!state.username) {
    app.innerHTML = `
      <div class="login-view">
        <h2 class="login-title">Login</h2>
        <input class="username-input" type="text" id="username" placeholder="Enter username" />
        <button class="login-btn" id="login-btn">Login</button>
        <p class="error">${state.error}</p >
      </div>
    `;
    document.getElementById('login-btn').addEventListener('click', handleLogin);
  } else {
    app.innerHTML = `
      <div class="word-view">
        <h2>Welcome, ${state.username}!</h2>
        <p>Your stored word: <span class="stored-word">${state.storedWord || 'No word stored'}</span></p >
        <input class="word-input" type="text" id="new-word" placeholder="Enter a new word" />
        <button class="update-word-btn" id="update-word-btn">Update Word</button>
        <button class="logout-button" id="logout-btn">Logout</button>
        <p class="error">${state.error}</p >
      </div>
    `;
    document.getElementById('update-word-btn').addEventListener('click', handleUpdateWord);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
  }
}

function handleLogin() {
  const username = document.getElementById('username').value.trim();
  login(username)
    .then((data) => {
      setSession(data.username);
      setError('');
      return fetchWord();
    })
    .then((data) => {
      setStoredWord(data.storedWord);
      render();
    })
    .catch((error) => {
      let errorMessage;
      if (error.error === 'auth-insufficient') {
            errorMessage = 'Access Denied';
      } else {
          errorMessage = 'Invalid username';
      }
      setError(errorMessage);
      render();
    });
}

function handleUpdateWord() {
  const newWord = document.getElementById('new-word').value.trim();
  updateWord(newWord)
    .then((data) => {
      setStoredWord(data.storedWord);
      setError('');
      render(); }); 
    }


function handleLogout() { 
  logout() .then(() => { 
    clearSession(); 
    render(); 
  }); 
}
