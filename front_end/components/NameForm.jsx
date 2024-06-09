import React, { useEffect, useState } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const NameForm = ({ relation, first, setFirst, middle, setMiddle, last, setLast, maiden, setMaiden, common, setCommon, handleRelation }) => {
    const [message, setMessage] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const findMatch = async () => {
        if (!first && !middle && !last) {
            setMessage('No valid name')
            return;
        }
        setLoading(true)
        try {
            const res = await axios.get(`${apiBaseUrl}/persons/search`, {
                params: {
                    first,
                    middle,
                    last
                }
            });
            if (res.status === 200) {
                setMessage('Match or matches found')
                setMatches(res.data.persons)
            }
            setMessage('No Matches found')

        } catch (error) {
            setMessage(`Error: ${error.message}`)
        }
        setLoading(false)
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            findMatch();
        }, 500); // Debounce API calls by 500ms

        return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount or value change
    }, [first, middle, last]);

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
            {loading ? (
                <p>Loading...</p>
            ) : (
                matches && matches.map((match) => (
                    <div key={match._id}> 
                        <p>{match.name.first} {match.name.middle} {match.name.last}</p>
                        <p>ID {match._id}</p>
                        <button onClick={() => handleRelation(relation, match._id)}>Select Person</button>
                    </div>
                ))
            )}
        <p>{message}</p>
       </div>
    )
}