import React, { useState } from 'react';
import "./Login.css";

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true); // Flag to toggle between login and registration modes
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const endpoint = isLoginMode ? 'login' : 'register';
        const requestBody = isLoginMode
           ? { email, password }
           : { name, email, password };

        const response = await fetch(`http://localhost:3000/api/users/${endpoint}`, {
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
            console.log(message, userData);
            const userToken = userData.data.token;
            setToken(userToken);
            // console.log(userToken);

        } else {
            setMessage(isLoginMode ? 'Invalid email or password' : 'Account with this email already exists');
            console.error(message);
        }
    } catch (error) {
        setMessage('Error during sending the request');
        console.error(message, error);
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

                <button type="submit" className="Login-button">
                    {isLoginMode ? 'Log In' : 'Register'}
                </button>

                <button type="button" onClick={handleModeChange} className="ToggleMode-button">
                    {isLoginMode ? 'Create an account' : 'Already have an account? Log in'}
                </button>
                <p>

                </p>
                {message && <div className="Message">{message}</div>}
            </form>
        </div>
    );
}
