import React, { useState } from "react";
import validateDate from '../utils/utils';
import axios from 'axios'

const BirthForm = ({ dob, setDob }) => {
    const handleBirth = () => {
        console.log('this birth has not been handled')
    }
    return (
        <fieldset>

            <legend>Birth</legend>
            <label htmlFor="dobInput">Date of birth</label>    
            <input 
                type="text"
                id="dobInput"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder='YYYY-MM-DD'
            />

            <button type='button' onClick={() => handleBirth(e)}>Update Birth</button>
            <p>{message}</p>
        
        </fieldset>
    )
}

const DeathForm = ({ dod, setDod }) => {

    const handleDeath = () => {
        console.log('this death has not been handled')

    }

    return (
        <fieldset>

            <legend>Death</legend>            
            <label htmlFor="dodInput">Date of death</label>
            <input 
                type="text"
                id="dodInput"
                value={dod}
                onChange={(e) => setDod(e.target.value)}
                placeholder='YYYY-MM-DD'
            />           
            <button  type='button' onClick={() => handleDeath(e)}>Add Event</button>
            <p>{message}</p>
        
        </fieldset>
    )
}

const updateDBEvents = async () => {
    try {

    } catch (error) {
        setMessage(`Error: ${error.message}`)
    }
}

const EventsForm = ({ events, setEvents }) => {
    const [message, setMessage] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleNewEvent = () => {

        if (eventDesc === '' || eventDate === '') {
            setMessage('Please fill out both fields')
            return
        };
        if (!validateDate(eventDate)) {
            setMessage('Invalid date format. Please use YYYY-MM-DD.');
            return
        }   

        const tempArray = [...events]
        tempArray.push({ description: eventDesc, date: eventDate })   
        setEvents(tempArray);    
           
        // Clear form    
        setEventDesc('');
        setEventDate('');
        
        setMessage('Event added successfully')     
    } 

    


    return (
        <fieldset>

            <legend>Dates of interest</legend>
            
            <label htmlFor="eventDescInput">Life event</label>
            
            <textarea 
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
                placeholder='YYYY-MM-DD'
            />
           
            <button type='button' onClick={() => handleNewEvent()}>Add Event</button>
            <p>{message}</p>
        
        </fieldset>
    )
}

const DatesForm = ({ dob, setDob, events, setEvents, dod, setDod }) => {
    const [message, setMessage] = useState('');

    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');
    
    const handleNewEvent = (e) => {
        e.preventDefault();
       if (eventDesc !== '' && eventDate !== '') {
        if (!validateDate(eventDate)) {
            setMessage('Invalid date format. Please use YYYY-MM-DD.');
            setTimeout(() => setMessage(''), 3000);
            return
        }
        const tempArray = [...events]
        tempArray.push({ description: eventDesc, date: eventDate })
        setEvents(tempArray);
        setEventDesc('');
        setEventDate('');
        setMessage('Event added successfully')
        setTimeout(() => setMessage(''), 3000); 
       } else {
        setMessage('Please fill out both fields')
        setTimeout(() => setMessage(''), 3000); 
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

export {
    BirthForm,
    DeathForm,
    DatesForm
}