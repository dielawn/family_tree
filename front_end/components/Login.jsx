import React, { useEffect, useState } from "react";
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export const Login = ({ handleUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}/login`, { username, password });
            localStorage.setItem('token', res.data.token)
            handleUser();
            setMessage('Login successful');
        } catch (error) {
            setMessage(`Login Failed: ${error.res}`);
        }
    };

    return (
        <fieldset>
            <legend>Login</legend>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </fieldset>
    )
};

export const Logout = ({ handleUser }) => {
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        handleUser();
        setMessage('Logout successful');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <p>{message}</p>
        </div>
    )
}