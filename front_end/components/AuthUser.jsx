import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";

export const AuthUser = () => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Not authorized, please login');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId

        try {
            const res = await axios.get(`${config.apiBaseUrl}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(res.data);
            setMessage('User data set');
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                setMessage(`Failed to fetch data: ${error.response.data.message}`);
            } else if (error.request) {
                // Request was made but no response received
                setMessage('Failed to fetch data: No response from server');
            } else {
                // Something else caused the error
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            
        {data ? (
            <div>
                <h2>Welcome {data.user.username}</h2>
                <p>USER ID: {data.user.id} </p>
                {/* load person or person form */}
                <p>{message}</p>
            </div>

           
        ) : (
            <p>{message}</p>
        )}
    </div>
    )
}