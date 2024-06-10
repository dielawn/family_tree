import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


import { Login, Logout } from '../components/Login';
import { Register } from '../components/Register';
import { AuthUser } from '../components/AuthUser';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null)
  const [personId, setPersonId] = useState(null)
  const [registerVis, setRegisterVis] = useState(false);

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
        const res = await axios.get(`${apiBaseUrl}/`, {
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
      <h1>Family Tree App</h1>
      <h2>Hello {user && user.username}</h2>
      {user ?( <div>
          <Logout handleUser={handleUser}  />
          <AuthUser personId={personId} />
          {/* Include other protected components like AuthReq */}
          
        </div>)
      : 
     ( <div>
        
        {!registerVis && 
        <>
          <h3>Please Login</h3>
          <Login handleUser={handleUser} />
         
        </>}
        
        <button onClick={() => setRegisterVis(!registerVis)}>{registerVis ? 'Login' : 'Create a new account' }</button>
     
       {registerVis && <Register />}
      </div>)}
      <p>{message}</p>
    </div>
  )
}

export default App
