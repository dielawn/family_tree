import React, { useEffect, useState } from "react";
import axios from "axios";

export const NameForm = ({ relation, first, setFirst, middle, setMiddle, last, setLast, maiden, setMaiden, common, setCommon, isFamily, setIsFamily}) => {
    const [message, setMessage] = useState('');

    const [matches, setMatches] = useState([]);

    const findMatch = async () => {
        try {
            const res = await axios.get(`${config.apiBaseUrl}/persons/search`, {
                params: {
                    first,
                    middle,
                    last
                }
            });
            if (res.status === 200) {
                setMessage('Match or matches found')
                setMatches(res.persons)
            }

        } catch (error) {
            setMessage(`Error: ${error.message}`)
        }
    };

    useEffect(() =>{
        findMatch();
    }, [first, middle, last])

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
                    value={maiden}
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
                {matches && matches.map((match) => (
                   <div key={match._id}> 
                       <p>{match.name.first} {match.name.middle} {match.name.last}</p>
                       <p>AKA {match.name.common}</p>
                       <button onClick={() => handleFamily(relation, match._id)}>Select Person</button>
                       
                   </div>
                ))}
        <p>{message}</p>
       </div>
    )
}