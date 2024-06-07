import React, { useState } from "react";
import axios from "axios";

export const NameForm = ({ first, setFirst, middle, setMiddle, last, setLast, maiden, setMaiden, common, setCommon }) => {
    const [message, setMessage] = useState('');




    return (
       <div>
        
            <fieldset>
                <legend>Name:</legend>
                <label htmlFor="firstInput">First:</label>
                <input 
                    type="text"
                    id="firstInput"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}    
                />
                <label htmlFor="middleInput">Middle:</label>
                <input 
                    type="text"
                    id="middleInput"
                    value={middle}
                    onChange={(e) => setMiddle(e.target.value)}
                />
                <label htmlFor="lastInput">Last</label>
                <input 
                    type="text" 
                    id="lastInput"
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                />
                <label htmlFor="maidenNameInput">Maiden</label>
                <input 
                    type="text" 
                    id="maidenNameInput"
                    value={maidenName}
                    onChange={(e) => setMaiden(e.target.value)}    
                />
                <label htmlFor="nicknameInput">Common or Nickname</label>
                <input 
                    type="text"
                    id="nicknameInput"
                    value={common}
                    onChange={(e) => setCommon(e.target.value)}
                />
            </fieldset>
                
        <p>{message}</p>
       </div>
    )
}