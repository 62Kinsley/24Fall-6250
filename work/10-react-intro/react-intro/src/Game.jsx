import compare from './compare.js';
import { useState } from 'react';
import './Game.css';

function Game({ setLogin, setUsername }) {
    const [currentGuess, setGuessInput] = useState('');
    const [previousGuess, setPreviousGuess] = useState('');
    const [errorMessage, setErrorMessage] = useState(0);
    return (
        <div className="game">
            <button className='logout-button' onClick={() => {
                setLogin(false);
                setUsername('');
            }
        }>Logout</button>
            {errorMessage === 1 && <p>{previousGuess} was not a valid word</p>}
            {errorMessage === 2 && <p>{previousGuess} had {compare(previousGuess)} letters in common</p>}
            {errorMessage === 3 && <p>{previousGuess} is the secret word!</p>}
            <label> Make your new guess (a 5 letter word):
                <input className='game-input' value={currentGuess} onInput={ e => setGuessInput(e.target.value)}/>
            </label>
            <button className='submit-button' onClick={ () => {
                if (currentGuess.toUpperCase() === 'RECAT') {
                    setErrorMessage(3)
                }else if (!currentGuess.match(/^[a-zA-Z]{5}$/)) {
                    setErrorMessage(1)
                }  else {
                    setErrorMessage(2)};
                    setPreviousGuess(currentGuess);
                    setGuessInput('');
            }   
        }>Submit</button>
        </div>
    );
}

export default Game;