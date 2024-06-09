import React, { useState, useEffect } from "react";

export const BioForm = ({ bio, setBio }) => {
    const [message, setMessage] = useState('')
    
    return (
        <fieldset>
            <legend>Biography</legend>
            <textarea 
                name="bioTxt" 
                id="bioTxt"
                value={bio}
                onChange={(e) => setBio(e.target.value)}    
            />
        </fieldset>
    )
}