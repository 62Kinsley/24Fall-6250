import { useEffect, useState } from 'react';
import services from "./services.js";
import Login from './Login.jsx';
import Word from './WordPage.jsx';
import LoadingIndicator from './Loading.jsx';
import './App.css';

function App() {

  const [username, setUsername] = useState('');
  const [word, setWord] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [indicator, setIndicator] = useState(false);

  useEffect(
    () => {
      services.fetchSession()
      .catch(() => {
        setUsername('');
      })
      .then(response => {
        if(response) {
          setUsername(response.username);
          services.fetchGetWord()
          .then(response => {
              if(response) {
                setWord(response.storedWord);
              }
          });
        }
      });
    },
  );

  function onLogin( username ) {
    setIndicator(true);
    services.fetchLogin(username)
    .catch(err => {
      setMessage(err.error === 'required-username' ? 'Please choose a different username!':'Access Denied!' );
      setIndicator(false);
    })
    .then(response => {
      if(response) {
          setIndicator(false);
          setUsername(response.username);
          setMessage('');
          services.fetchGetWord()
          .then(response => {  
              setWord(response.storedWord);
              
          });
      }
    });
  }

  function onUpdate( word ) { 
    setIndicator(true);
    setErrorMsg('');
    services.fetchSession()
      .catch(() => {
        setUsername('');
        setIndicator(false);
      })
      .then(
        services.fetchUpdateWord(word)
        .then(response => {
            if(response) {
              setWord(response.storedWord);
              setIndicator(false);
            }
        })
        .catch(err => {
          if (err.error === 'invalid-word') {
            setErrorMsg('Invalid saved word');
            setIndicator(false); 
          }   
        })
      );
  }

  function onLogout() {
    setIndicator(true);
    services.fetchSession()
      .catch(() => {
        setUsername('');
        setIndicator(false);
      })
      .then(
        services.fetchLogout()
        .then(() => {
            setUsername('');
            setWord('');
            setIndicator(false);
        })
      );
  }

  return (
    <>
      { indicator && <LoadingIndicator/> }
      { username === '' ?   (
         <Login
            message={message}   
            onLogin={onLogin}
         /> 
         ):( 
         <Word 
            username={username} 
            word={word} 
            onUpdate={onUpdate} 
            onLogout={onLogout}
            errorMsg={errorMsg}
         /> 
        )}
    </>
  );
}

export default App;
