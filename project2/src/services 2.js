export function fetchLogin(username) {
    return fetch('/api/v1/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify( { username } ),
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
  }
  

export function fetchCheck() {
    return fetch('/api/v1/session/', {
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
  
export function fetchLogout() {
    return fetch('/api/v1/session', {
      method: 'DELETE',
    })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
  }
  
export function fetchGetMessageList() {
    return fetch('/api/v1/messages', {
      method: 'GET',
    })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
  }
  
export function fetchSendMessage(message) {
    return fetch('/api/v1/messages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
  }
  