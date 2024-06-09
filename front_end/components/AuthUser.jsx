import React, { useState } from "react";

import { CreatePersonForm } from "./CreatePerson";
import { FamilyTree } from "./Tree";

export const AuthUser = ({ user, userId, personId }) => {
    const [message, setMessage] = useState('');
    const [formVis, setFormVis] = useState(false);
    const [treeVis, setTreeVis] = useState(true)




    return (
        <div>
            
        {user ? (
            <div>
                <button onClick={() => setTreeVis(!treeVis)}>View Family Tree</button>
                {treeVis && < FamilyTree />}
                <h2>Welcome {user.user.username}</h2>
                <p>USER ID: {userId} </p>
                <p>Person ID: {personId}</p>
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