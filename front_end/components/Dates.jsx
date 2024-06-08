import React, { useEffect, useState } from "react";

export const DatesForm = ({ dob, setDob, events, setEvents, dod, setDod }) => {
    const [message, setMessage] = useState('');

    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');
    
    const handleNewEvent = (e) => {
        e.preventDefault();
       if (eventDesc !== '' && eventDate !== '') {
        const tempArray = [...events]
        tempArray.push({ description: eventDesc, date: eventDate })
        setEvents(tempArray);
        setEventDesc('');
        setEventDate('');
        setMessage('Event added successfully')
       } else {
        setMessage('Please fill out both fields')
       }
    };

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

            <label htmlFor="eventDescInput">Life event</label>
            <input 
                type="text"
                id="eventDescInput"
                value={eventDesc}
                onChange={(e) => setEventDesc(e.target.value)}    
            />
            <label htmlFor="eventDateInput">Date of event</label>
            <input 
                type="text"
                id="eventDateInput"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}    
            />
           
            <button onClick={(e) => handleNewEvent(e)}>Add Event</button>
            <p>{message}</p>
        
        </fieldset>
    )
};