import React, { useState } from 'react';
import Button from '../Common/Button'
import AppContext from '../../AppContext'
import "./Login.css";

export default function Login({ setToken, setUserId }) {
    const {globalState, setGlobalState} = React.useContext(AppContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true); // Flag to toggle between login and registration modes
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const endpoint = isLoginMode ? 'login' : 'register';
        const requestBody = isLoginMode
           ? { email, password }
           : { name, email, password };

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const userData = await response.json();
           
            setMessage(isLoginMode ? 'Logged in successfully!' : 'Account created successfully!');
            setEmail('');
            setPassword('');
            setName('');
            const userToken = userData.data.token;
            setToken(userToken);
            setUserId(userData.data._id)
            setGlobalState({ ...globalState, isAdmin: userData.data.isAdmin })
        } else {
            setMessage(isLoginMode ? 'Invalid email or password' : 'Account with this email already exists');
        }
    } catch (error) {
        setMessage('Error during sending the request');
        console.log(error);
    }
    };

    const handleModeChange = () => {

        setEmail('');
        setPassword('');
        setName('');
        setIsLoginMode(!isLoginMode);
    };

    return(
        <div className="Login-container">
            <form className="Login-form" onSubmit={handleSubmit}>
                {isLoginMode ? null : (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            type="text"
                            placeholder="Your Name"
                            id="name"
                            name="name"
                            className="Login-input"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}

                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    type="email"
                    placeholder="email@example.com"
                    id="email"
                    name="email"
                    className="Login-input"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                    className="Login-input"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    onClick={() => {}} 
                    type='submit' 
                    content={isLoginMode ? 'Log In' : 'Register'} 
                    className="Login-button"/>
                <Button 
                    onClick={handleModeChange} 
                    type = 'button' 
                    content={isLoginMode ? 'Create an account' : 'Already have an account? Log in'} 
                    className="ToggleMode-button"/>

                <p>

                </p>
                {message && <div className="Message">{message}</div>}
            </form>
        </div>
    );
}
