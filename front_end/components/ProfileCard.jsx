import React, { useEffect, useState } from "react";
import moment from 'moment';

export const ProfileCard = ({ person, setSelectedPerson }) => {
    const [detailsVis, setDetailsVis] = useState(false)

    const formatDate = (date) => moment(date).format('MMMM DD YYYY');

    return (
        <div>
            <h3>{person.name.first} {person.name.middle} {person.name.last} {person.name.maiden }</h3>
            {person.name.common && (<h4>{person.name.common}</h4>)}
            {person.dob && <h5>BORN {formatDate(person.dob)}</h5>} 
            - 
            { person.dod ? <h5>DIED { formatDate(person.dod) }</h5> : <h5>Still kickin!</h5> }
           
            <button type='button' onClick={() => setSelectedPerson(person)}>Select Person</button>
            <button type='button' onClick={() => setDetailsVis(!detailsVis)}>{detailsVis ? 'Hide Details' : 'View Details'}</button>
            {detailsVis && (
                <>
                    {person.events && person.events.map((event, index) => (
                        <p key={index}>{formatDate(event.date)} - {event.description} </p>
                    ))}

                    {/* {person.children && person.children.map((child) => (
                        <p key={child._id}>{child.name.first} {child.name.middle} {child.name.last}</p>
                    ))} */}

                    {/* <button type='button' >Add Relation</button> {/* name form */}
                    {/* <button type='button' >Add Event</button>  {/* dates form */}
                    {/* <button type='button' >Edit Profile</button>  profile form */} 
                </>
            )}
        </div>
    )
};