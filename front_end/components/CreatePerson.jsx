import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../src/config";

import { NameForm } from "./NameForm";
import { DatesForm } from "./Dates";
import { ParentsForm } from "./Parents";
import { ChildrenForm } from "./ChildrenForm";
import { BioForm } from "./BioForm";



export const CreatePersonForm = ({ personId }) => {

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
    const [adoptiveFather, setAdoptiveFather] = useState(null);
    const [adoptiveMother, setAdoptiveMother] = useState(null);
    
    //children
    const [children, setChildren] = useState([]);

    //biography
    const [bio, setBio] = useState('');

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
                bio_father: bioFather || '',
                bio_mother: bioMother || '',
                adoptive_father: adoptiveFather || '',
                adoptive_mother: adoptiveMother || '',
                children
            }
            const res = await axios.post(`${config.apiBaseUrl}/person`, newPerson);
            if (res.status === 201) {
                setMessage(`Success: ${res.data.message}`)
                console.log(`created person id: ${res.data.id}`)
            }
            setMessage(`Failed submit person: ${res.data.message}`);
        } catch (error) {
                setMessage(`Error: ${error.message}`)
        }
    };

    const handleRelation = async (relation, personId) => {
        switch (relation) {
            case 'bioFather':
                setBioFather(personId);
                break;
            case 'bioMother':
                setBioMother(personId);
                break;
            case 'adoptiveFather':
                setAdoptiveFather(personId);
                break;
            case 'adoptiveMother':
                setAdoptiveMother(personId);
                break;
            case 'children':
                addToChildren(personId);   
                break;
            case 'newPerson':
                return  
        default:
            console.log(`Unknown relation: ${relation}`);     
        };
     };

    const addToChildren = (childId) => {
        setChildren(prevChildren => [...prevChildren, childId])
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
                    handleRelation={handleRelation}
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
                    adoptiveFather={adoptiveFather}
                    setAdoptiveFather={setAdoptiveFather}
                    adoptiveMother={adoptiveMother}
                    setAdoptiveMother={setAdoptiveMother}
                    handleRelation={handleRelation}
                />
                <ChildrenForm 
                    children={children}
                    setChildren={setChildren}
                    addToChildren={addToChildren}
                    personId={personId}
                    handleRelation={handleRelation}
                    isAdopted={isAdopted}
                    setIsAdopted={setIsAdopted}
                />
                <BioForm
                    bio={bio}
                    setBio={setBio}    
                />


                <button type="submit">Submit</button>
            </form>             
            <p>{message}</p>
        </div>
    )
}