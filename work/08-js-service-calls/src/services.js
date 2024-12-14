export function fetchSession() {
  return fetch('/api/session/', {
    method: 'GET',
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json();
  });
}

export function login(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username }),
  })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    });
}

export function logout() {
  return fetch('/api/session', { method: 'DELETE' })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchWord() {
  return fetch('/api/word', { method: 'GET' })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    });
}

export function updateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ word }),
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
          
      }
      return response.json();
    });
}
