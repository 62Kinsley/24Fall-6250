import { useState } from 'react';
import './WordPage.css';

function WordPage({ username, word, onUpdate, onLogout, errorMsg }) {
    const [updateWord, setUpdateWord] = useState('');
    return (
        <div className="word-page">
            <h1 className="welcome-message">Welcome! {username}</h1>
            <p className="saved-word">Your saved word is: {word}</p>
            <form>
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                <label> Update your saved word:
                    <input className= "update-word" value={updateWord} onInput={ e => setUpdateWord(e.target.value)}/>
                </label>
                <button className= "update-button" type="button" onClick={() => onUpdate(updateWord)}>Update</button>
                <button className= "logout-button" type="button" onClick={() => onLogout()}>Logout</button>
            </form>
            
        </div>
    );
}

export default WordPage;
