import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Login, Logout } from './Login';
import { Register } from './Register';
import { AuthUser } from '../components/AuthUser';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('Loading...');
  const [userId, setUserId] = useState(null)
  const [personId, setPersonId] = useState(null)

  const handleUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setMessage('Valid token, user set');
      } catch (error) {
        setMessage(`Invalid token ${error}`);
      }
    } else {
      try {
        const res = await axios.get(`${config.apiBaseUrl}/`, {
          headers: { Authorization: `Bearer ${token}`},
        });
        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
          setUserId(res.data.user._id);
          setPersonId(res.data.user.person._id);
          setMessage('User set');
        } else {
          // log out
          setUser(null);
        }

      } catch (error) {
        setMessage(`Error: ${error}`);
      }
    }
  };

  useEffect(() => {
    handleUser();
  }, []);


  return (
    <div>
      {user ?( <div>
          <h1>Hello {user.username}</h1>
          <Logout handleUser={handleUser}  />
          <AuthUser personId={personId} />
          {/* Include other protected components like AuthReq */}
          
        </div>)
      : 
     ( <div>
        <h1>Hello</h1>
        <h3>Please Login</h3>
        <Login handleUser={handleUser} />
        <hr />
        <h4>Or Create a new account</h4>
        <Register />
      </div>)}
      <p>{message}</p>
    </div>
  )
}

export default App
