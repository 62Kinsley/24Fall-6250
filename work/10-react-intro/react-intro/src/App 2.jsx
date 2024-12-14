import { useState } from 'react';
import Login from './Login.jsx';
import Word from './Game.jsx';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <div className="app">
      { isLoggedIn
        ? <p 
            className='username'>You logged in as {username}
          </p>
          && 
          <Word 
            setLogin={setIsLoggedIn} setUsername={setUsername}
          />
        : <Login 
            setLogin={setIsLoggedIn} setUsername={setUsername}
          />
      }
    </div>
  );
}

export default App;
