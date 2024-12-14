import { fetchSession, fetchWord } from './services.js';
import { setSession, clearSession, setError } from './state.js';
import { render } from './view.js';


function checkSession() {
  fetchSession()
    .then((data) => {
      setSession(data.username);
      return fetchWord();
    })
    .then((data) => {
      render();
    })
    .catch((error) => {
      if (error.error === 'auth-missing') {
        clearSession();
      }
      setError('');
      render();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  render();
});
