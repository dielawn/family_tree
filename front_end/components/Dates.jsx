import React, { useEffect, useState } from "react";

export const DatesForm = ({ dob, setDob, events, setEvents, dod, setDod }) => {
    const [message, setMessage] = useState('');
    const [event, setEvent] = useState('');
    const [eventArray, setEventArray] = useState([]);

    const handleNewEvent = () => {
       if (event !== '') {
        const tempArray = [...eventArray]
        tempArray.push(event)
        setEventArray(tempArray);
        setEvent('')
       }
    }

    

    return (
        <fieldset>
            <legend>Dates of interest</legend>
            <label htmlFor="dobInput">Date of birth</label>    
            <input 
                type="text"
                id="dobInput"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            
            <label htmlFor="dodInput">Date of death</label>
            <input 
                type="text"
                id="dodInput"
                value={dod}
                onChange={(e) => setDod(e.target.value)}
            />

            <label htmlFor="eventsInput">Event</label>
            <input 
                type="text"
                id="eventsInput"
                value={event}
                onChange={(e) => setEvent(e.target.value)}    
            />
            <button onClick={() => handleNewEvent()}>Add Event</button>
        
        </fieldset>
    )
}