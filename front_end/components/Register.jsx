import React, {useState} from "react";
import axios from "axios";
// Register.jsx
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [message, setMessage] = useState('Register');

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}/register`, { 
                params: {username, password, confirmPwd, }
            });
            if (res.status === 201) {
                setMessage('Registration successful');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setMessage(error.response.data.errors.map(err => err.msg).join(', '));
            } else if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage(`Error registering: ${error.message}`);
            }
        }
    };

    return (
        <div>
           <form onSubmit={handleRegistration}>
           <label htmlFor="username">Username 
            <input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /></label>
            <label htmlFor="password">Password 
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                /></label>
            <label htmlFor="confirmPwd">Confirm Password 
            <input 
                type="password" 
                value={confirmPwd} 
                onChange={(e) => setConfirmPwd(e.target.value)} 
                /></label>
            <button type="submit">Register</button>
           </form>
           <p>{message}</p>
        </div>
    );
};