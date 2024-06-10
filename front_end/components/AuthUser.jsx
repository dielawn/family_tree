import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CreatePersonForm } from "./CreatePerson";
import { FamilyTree } from "./Tree";

export const AuthUser = ({ user, userId, personId }) => {
    const [message, setMessage] = useState('');
    const [formVis, setFormVis] = useState(false);
    const [treeVis, setTreeVis] = useState(true)
    const token = localStorage.getItem('token')
    const decoded =jwtDecode(token)

        // useEffect(() => {
        //     console.log(decoded.username)
        // }, [token])


    return (
        <div>
            
        {decoded ? (
            <div>
                <button onClick={() => setTreeVis(!treeVis)}>View Family Tree</button>
                {treeVis && < FamilyTree />}
                <h2>Welcome {decoded.username}</h2>
                <p>USER ID: {decoded.id} </p>
                {decoded.person && <p>Person ID: {decoded.person.id}</p>}
                {/* load person or person form */}
                <button onClick={() => setFormVis(!formVis)}>Add new person</button>
                { formVis && <CreatePersonForm personId={personId}/> }
                <p>{message}</p>
            </div>

           
        ) : (
            
            <p>Not Authorized: {message}</p>
        )}
    </div>
    )
}