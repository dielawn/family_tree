import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";

import { CreatePersonForm } from "./CreatePerson";


export const AuthUser = ({ user, userId, personId }) => {
    const [message, setMessage] = useState('');
    const [crtPrsnFrmVis, setCrtPrsnFrmVis] = useState(false)



    return (
        <div>
            
        {user ? (
            <div>
                <h2>Welcome {user.user.username}</h2>
                <p>USER ID: {userId} </p>
                <p>Person ID: {personId}</p>
                {/* load person or person form */}
                <button onClick={() => setCrtPrsnFrmVis(!crtPrsnFrmVis)}>Add new person</button>
                { crtPrsnFrmVis && <CreatePersonForm personId={personId}/> }
                <p>{message}</p>
            </div>

           
        ) : (
            
            <p>Not Authorized: {message}</p>
        )}
    </div>
    )
}