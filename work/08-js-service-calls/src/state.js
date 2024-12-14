let state = {
  username: '',
  storedWord: '',
  error: '',
};

export function setSession(username) {
  state.username = username;
}

export function clearSession() {
  state.username = '';
  state.storedWord = '';
  state.error = '';
}

export function setError(error) {
  state.error = error;
}

export function setStoredWord(word) {
  state.storedWord = word;
}

export function getState() {
  return state;
}
