import { useState } from 'react';
import './Login.css';

function Login({ setLogin, setUsername }) {
    const [usernameInput, setInputValue] = useState('');
    const [error, setError] = useState(0);
    return (
        <div className="login">
            {error === 1 && <p>Not a valid user!</p>}
            {error === 2 && <p>Username is not made up of valid characters</p>}

            <label> Please Enter Your Username: (letters and numbers only)
                <input 
                    className='login-input' 
                    value={usernameInput} 
                    onInput={ e => setInputValue(e.target.value)}/>
            </label>

            <button className='login-button' type="button" onClick={ () => {
                if (usernameInput.match(/^[A-Za-z0-9_]+$/)) {
                    setUsername(usernameInput);
                    setLogin(true);
                    setInputValue('');
                    setError(0);
                }else if (usernameInput === 'dog') {
                    setError(1)
                } else {
                    setError(2)
                }
            } 
            }>Login</button>
        </div>
    );
}

export default Login;