import React, { useState } from "react";
import { NameForm } from "./NameForm";
import axios from "axios";

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
    const [dod, setDod] = useState('');

    //parents
    const [bioFather, setBioFather] = useState('');
    const [bioMother, setBioMother] = useState('');
    //toggle adopted inputs vis
    const [isAdopted, setIsAdopted] = useState(false); 
    const [adoptedFather, setAdoptedFather] = useState(null);
    const [adoptedMother, setAdoptedMother] = useState(null);

    //children
    const [children, setChildren] = useState([]);

    //biography
    const [bio, setBio] = useState('');


    const handleSubmitPerson = async () => {
        try {
            const personName =  { first, middle, last, maiden, common } 
            await axios.post('/person', personName)


        } catch (error) {
                setMessage(`Error: ${error.message}`)
        }
    }


    return (
       <div>
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
        />
        <p>{message}</p>
       </div>
    )
}