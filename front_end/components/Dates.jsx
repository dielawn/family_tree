import React, { useState, useEffect, useRef } from "react";
import validateDate from '../utils/utils';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token')

const handleError = (err) => {    
    if (err.response) {
      // API returned an error response
      const errorResponse = err.response;
      if (errorResponse.status === 401) {
        // Unauthorized, token might be expired or invalid
        return 'Unauthorized. Please log in again.';
      } else if (errorResponse.status === 404) {
        // Resource not found
        return 'Resource not found. Please check the selected person ID.';
      } else {
        // Other API error
        return `API error: ${errorResponse.statusText}`;
      }
    } else if (err.request) {
      // No response was received
      return 'No response received from the server. Check your network connection.';
    } else {
      // Something went wrong with the request
      return 'An error occurred while sending the request. Please try again later.';
    }
};

const handleAPI = async (eventDate, isDob, personId ) => {
    const API_ENDPOINT_DOB = `${apiBaseUrl}/dob`;
    const API_ENDPOINT_DOD = `${apiBaseUrl}/dod`;
    const DATA_KEY_DOB = 'dob';
    const DATA_KEY_DOD = 'dod';

    const apiConfig = {
        dob: { endpoint: API_ENDPOINT_DOB, dataKey: DATA_KEY_DOB },
        dod: { endpoint: API_ENDPOINT_DOD, dataKey: DATA_KEY_DOD },
      };

    try {
        const dateISO = eventDate.toISOString()
        console.log('dateISO', dateISO)
        const { endpoint, dataKey } = apiConfig[isDob ? 'dob' : 'dod'];
        const res = await axios({
            method: 'put',
            url: `${endpoint}/${personId}`,
            data: { [dataKey]: dateISO },
            headers: { Authorization: `Bearer ${token}` },
          });
       return res  
    } catch (error) {
       return handleError(error)
    };
};

const BirthForm = ({ dob, setDob,  selectedPerson }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [resObj, setResObj] = useState(null);

    const handleBirth = async () => {
        console.log('dob', dob)
        setLoading(true)
        try {      
                 
            const res = await handleAPI(dob, true, selectedPerson._id)
            
           setMessage('Update date of birth requst sent')    
           setResObj(res)  
        } catch (error) {
            setMessage(handleError(error))
        };
        setLoading(false)
    }

    useEffect(() => {
        if (resObj) {
            // if (resObj.data.message) {
            //     setMessage(resObj.data.message)
            // } else if (resObj.error) {
            //     console.log(resObj.error)
            // }
            console.log(resObj)
        }        
      }, [resObj])
  
    return (
        <fieldset>
        <legend>Birth</legend>
        <label htmlFor="dobInput">Date of birth</label>
        <DatePicker
            selected={dob}
            onChange={date => setDob(date)}
            placeholderText="Select a date"
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={250}
            scrollableYearDropdown
        />      
        <button type='button' onClick={() => handleBirth()}>Update Birth</button>
        {loading && <p>Loading...</p>}
        <p>{message}</p>
    </fieldset>    
    )
};

const DeathForm = ({ dod, setDod, selectedPerson }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [resObj, setResObj] = useState(null)
      
    const handleDeath = async () => {
        console.log('dod', dod)
        setLoading(true)
        try {
            
            const res = await handleAPI(dod, false, selectedPerson._id)
           
           setMessage('Update date of death requst sent')    
           setResObj(res)  
        } catch (error) {
            setMessage(handleError(error))
        };
        setLoading(false)
    }

    useEffect(() => {
        if (resObj) {
            setMessage(resObj.data.message)
        }        
      }, [resObj])
  
    return (
      <fieldset>
        <legend>Death</legend>
        <label htmlFor="dodInput">Date of death</label>       
        <DatePicker
          selected={dod}
          onChange={date => setDod(date)}
          placeholderText="Select a date"
          showYearDropdown
          dateFormatCalendar="MMMM"
          yearDropdownItemNumber={250}
          scrollableYearDropdown
        />
        <button type='button' onClick={() => handleDeath()}>Update Death</button>
        {loading && <p>Loading...</p>}
        <p>{message}</p>
      </fieldset>
    );
  };


const EventsForm = ({ events, setEvents,  selectedPerson }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [resObj, setResObj] = useState(null)
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleNewEvent = () => {
        if (eventDesc === '' || eventDate === '') {
            setMessage('Please fill out both fields');
            return;
        }
        
        const tempArray = [...events];
        tempArray.push({ description: eventDesc, date: eventDate },);
        setEvents(tempArray);

        // Clear form
        setEventDesc('');
        setEventDate('');

        setMessage('Event added to array');   
    };

    const updateDBEvents = async () => {
        setLoading(true)
        try {            
            const res = await axios({
                method: 'put',
                url: `${apiBaseUrl}/events/${selectedPerson._id}`,
                data: {
                    events,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Update date of death requst sent')    
            setResObj(res)  
        } catch (error) {
            setMessage(handleError(error))
        }        
    };

    useEffect(() => {
        if (resObj) {
            setMessage(resObj.data.message)
        }    
    }, [resObj])

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
            <DatePicker
                selected={eventDate}
                onChange={date => setEventDate(date)}
                placeholderText="Select a date"
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={250}
                scrollableYearDropdown
            />
            <button type="button" onClick={() => handleNewEvent()}>Add Event</button>
            <p>{message}</p>
            <button type='button' onClick={() => updateDBEvents()}>Update Events</button>
        </fieldset>
    );
};

const DatesForm = ({ dob, setDob, events, setEvents, dod, setDod, selectedPerson }) => {
    const [message, setMessage] = useState('');

    

    return (
        <fieldset>
            <BirthForm dob={dob} setDob={setDob} selectedPerson={selectedPerson} />
            <EventsForm events={events} setEvents={setEvents} selectedPerson={selectedPerson} />
            <DeathForm dod={dod} setDod={setDod} selectedPerson={selectedPerson} />      
            <p>{message}</p>        
        </fieldset>
    )
};

export {
    BirthForm,
    DeathForm,
    DatesForm
}