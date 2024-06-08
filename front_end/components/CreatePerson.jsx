import React, { useEffect, useState } from "react";
import axios from "axios";

import { NameForm } from "./NameForm";
import { DatesForm } from "./Dates";
import { ParentsForm } from "./Parents";
import { ChildrenForm } from "./ChildrenForm";


export const CreatePersonForm = () => {

    const [message, setMessage] = useState('');
    // Name stuff
    const [first, setFirst] = useState('');
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');
    const [maiden, setMaiden] = useState('');
    const [common, setCommon] = useState('');

    // birth and death dates
    const [dob, setDob] = useState(''); 
    const [events, setEvents] = useState([]);
    const [dod, setDod] = useState('');

    //parents
    const [bioFather, setBioFather] = useState({});
    const [bioMother, setBioMother] = useState({});
    //toggle adopted inputs vis
    const [isAdopted, setIsAdopted] = useState(false); 
    const [adoptedFather, setAdoptedFather] = useState(null);
    const [adoptedMother, setAdoptedMother] = useState(null);

    //children
    const [children, setChildren] = useState([]);

    //biography
    const [bio, setBio] = useState('');

    const [isFamily, setIsFamily] = useState(false);

    const handleSubmitPerson = async (e) => {
        e.preventDefault();
        try {
            const personName =  { first, middle, last, maiden, common } 
            const newPerson = {
                personName,
                bio,
                dob,
                events,
                dod,
                bioFather,
                bioMother,
                adoptedFather,
                adoptedMother,
                children
            }
            const res = await axios.post('/person', newPerson);
            if (res.status === 201) {
                setMessage('New person added to database')
            }
            setMessage(` ${res.status} Error: ${res.message}`);


        } catch (error) {
                setMessage(`Error: ${error.message}`)
        }
    };

    const handleFamily = async (relation, personId) => {
        setIsFamily(true)
        switch (relation) {
         case 'bioFather':
             setBioFather(personId);
         case 'bioMother':
             setBioMother(personId);
         case 'adoptedFather':
             setAdoptedFather(personId);
         case 'adoptedMother':
             setAdoptedMother(personId);
         case 'children':
             addToChildren(personId);   
        case 'newPerson':
            return       
        };
     };

    const addToChildren = (child) => {
        const tempArray = [...children]
        tempArray.push(child)
        setChildren(tempArray)
    }

    return (
        <div>
            <form onSubmit={handleSubmitPerson}>
                <NameForm 
                    first={first}
                    setFirst={setFirst}
                    middle={middle}
                    setMiddle={setMiddle}
                    last={last}
                    setLast={setLast}
                    maiden={maiden}
                    setMaiden={setMaiden}
                    common={common}
                    setCommon={setCommon}
                    handleFamily={handleFamily}
                    isFamily={isFamily}
                    setIsFamily={setIsFamily}
                    relation={'newPerson'}
                />
                <DatesForm 
                    dob={dob}
                    setDob={setDob}
                    dod={dod}
                    setDod={setDod}
                    events={events}
                    setEvents={setEvents}
                />
                <ParentsForm
                    bioFather={bioFather}
                    setBioFather={setBioFather}
                    bioMother={bioMother}
                    setBioMother={setBioMother}
                    isAdopted={isAdopted}
                    setIsAdopted={setIsAdopted}
                    adoptedFather={adoptedFather}
                    setAdoptedFather={setAdoptedFather}
                    adoptedMother={adoptedMother}
                    setAdoptedMother={setAdoptedMother}
                />
                <ChildrenForm 
                    children={children}
                    setChildren={setChildren}
                    addToChildren={addToChildren}
                />

                <button type="submit">Submit</button>
            </form>             
            <p>{message}</p>
        </div>
    )
}