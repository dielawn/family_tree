import React, {useState} from "react";
import axios from "axios";
// Register.jsx
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [message, setMessage] = useState("");
  
    const handleRegistration = async (e) => {
      e.preventDefault();
  
      // Validate input fields
      if (username.length < 3) {
        setMessage("Username must be at least 3 characters.");
        return;
      }
  
      if (password.length < 8) {
        setMessage("Password must be at least 8 characters long");
        return;
      }
  
      // Check password complexity
      const hasUpper = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+]/.test(password);
      if (!hasUpper || !hasNumber || !hasSpecialChar) {
        setMessage(
          "Password must contain at least one uppercase letter, one number, and one special character."
        );
        return;
      }
  
      if (confirmPwd !== password) {
        setMessage("Passwords do not match");
        return;
      }
  
      try {
        const res = await axios.post(`${apiBaseUrl}/register`, { username, password, confirmPwd });
        if (res.status === 201) {
          setMessage("Registration successful");
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setMessage(error.response.data.errors.map((err) => err.msg).join(", "));
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
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPwd">Confirm Password</label>
          <input
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    );
  };