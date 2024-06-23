import React, { useEffect, useState } from "react";

import { ProfileCard } from './ProfileCard';
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const NameForm = ({ relation, first, setFirst, middle, setMiddle, last, setLast, maiden, setMaiden, common, setCommon, handleRelation, setSelectedPerson }) => {
    const [message, setMessage] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token')

    const findMatch = async () => {
        if (!first && !middle && !last) {
            setMessage('First & Last name fields required')
            return;
        }
        setLoading(true)
        
        try {
            const res = await axios.get(`${apiBaseUrl}/search`, {
                params: {
                        first,
                        middle,
                        last
                },
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.status)
        
            if (res.status === 200) {
                setMessage(`${res.data.persons.length} ${res.data.message}`);
                setMatches(res.data.persons);
              } else if (res.status === 404) {
                setMessage('No mathes in database');
                setMatches([]);
              } else {
                setMessage('Error searching for matches');
                setMatches([]);
              }

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

    // Clears matches array when name form is edited
    useEffect(() => {
        return () => setMatches([]);
      }, [first, middle, last]);

    return (
       <div>
        
            <fieldset className="nameFieldset">
            <p className="messageTxt">{message}</p>
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
                    <div key={match._id} className="matchesDiv"> 
                        <ProfileCard setSelectedPerson={setSelectedPerson} person={match}/>
                    </div>
                ))
            )}
        
       </div>
    )
}