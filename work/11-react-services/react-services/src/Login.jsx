import { useState } from 'react';
import './Login.css';

function Login({ message, onLogin }) {
    const [loginName, setLoginName] = useState('');
    return (
        <>
            {message !== '' && <p>{message}</p>}
            <form>
                <label> Please Enter Your Username: 
                    <input className= "login-name" value={loginName} onInput={ e => setLoginName(e.target.value)}/>
                </label>
                <button className= "login-button" type="button" onClick={() => onLogin(loginName)}>Login</button>
            </form>
        </>
    );
}

export default Login;
