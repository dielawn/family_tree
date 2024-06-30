import React, { useState, useEffect, useRef } from "react";
import validateDate from '../utils/utils';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token')

const BirthForm = ({ dob, setDob,  selectedPerson }) => {
    const [message, setMessage] = useState('');
    const handleBirth = async () => {
        console.log('dob', dob)
        if (!dob) {
            setMessage('Please fill out both fields');
            return;
        }
        try {            
            const res = await axios({
                method: 'put',
                url: `${apiBaseUrl}/dob/${selectedPerson._id}`,
                data: {
                    params: {
                        id: selectedPerson._id,
                        dob
                    }                            
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (res.status === 200) {
                setMessage(`Success updating dob`);
            } else {
                setMessage('Error updating dob');
            }
        } catch (error) {
            setMessage(`Birth form error: ${error}`)
        }

    }
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
        <p>{message}</p>
    </fieldset>    
    )
};

const DeathForm = ({ dod, setDod, selectedPerson }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [resObj, setResObj] = useState(null)
      
    const handleDeath = async () => {
        try {
            setLoading(false)
            console.log(selectedPerson._id)
            const dateISO = dod.toISOString()
            const res = await axios({
                method: 'put',
                url: `${apiBaseUrl}/dod/${selectedPerson._id}`,
                data: {
                        dod                            
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
           setMessage('Update date of death requst sent')    
           setResObj(res)  

        } catch (error) {
            if (error.response) {
              // API returned an error response
              const errorResponse = error.response;
              if (errorResponse.status === 401) {
                // Unauthorized, token might be expired or invalid
                setMessage('Unauthorized. Please log in again.');
              } else if (errorResponse.status === 404) {
                // Resource not found
                setMessage('Resource not found. Please check the selected person ID.');
              } else {
                // Other API error
                setMessage(`API error: ${errorResponse.statusText}`);
              }
            } else if (error.request) {
              // No response was received
              setMessage('No response received from the server. Check your network connection.');
            } else {
              // Something went wrong with the request
              setMessage('An error occurred while sending the request. Please try again later.');
            }
          }     
    };

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
        <button type='button' onClick={() => handleDeath()}>Add Event</button>
        <p>{message}</p>
      </fieldset>
    );
  };

const EventsForm = ({ events, setEvents,  selectedPerson }) => {
    const [message, setMessage] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleNewEvent = () => {
        if (eventDesc === '' || eventDate === '') {
            setMessage('Please fill out both fields');
            return;
        }
        if (!validateDate(eventDate)) {
            setMessage('Invalid date format.  Please use MM-DD-YYYY.');
            return;
        }

        const tempArray = [...events];
        tempArray.push({ description: eventDesc, date: eventDate });
        setEvents(tempArray);

        // Clear form
        setEventDesc('');
        setEventDate('');

        setMessage('Event added successfully');

   
    };

    const updateDBEvents = async () => {
        try {            
            const res = await axios({
                method: 'put',
                url: `${apiBaseUrl}/events/${selectedPerson._id}`,
                data: {
                    params: {
                        id: selectedPerson._id
                    },
                    events
                    
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', res);
            if (res.status === 200) {
                setMessage(`Success updating events`);
            } else {
                setMessage('Error updating events');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };


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