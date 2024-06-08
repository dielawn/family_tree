import React, { useEffect, useState } from "react";
import axios from "axios";
import { NameForm } from "./NameForm";

export const ParentsForm = ({ bioFather, setBioFather, bioMother, setBioMother, isAdopted, setIsAdopted, adoptedFather, setAdoptedFather, adoptedMother, setAdoptedMother}) => {
    const [message, setMessage] = useState('');

    const findMatch = async (firstName, middleName, lastName) => {

    }

    const createPerson = async () => {

    }

    return (
        <fieldset>
            <legend>Parents</legend>
            <label htmlFor="bioFatherInput">Biological Father</label>
            <NameForm 
                type={'bioFather'}
                first={bioFather.name.first}
                middle={bioFather.name.middle}
            />
            <input 
                type="text"
                id="bioFatherInput"
                value={bioFather}
                onChange={(e) => setBioFather(e.target.value)}
            />
            <label htmlFor="bioMotherInput">Biological Mother</label>
            <input 
                type="text"
                id="bioMotherInput"
                value={bioMother}
                onChange={(e) => setBioMother(e.target.value)}
            />
            <label htmlFor="isAdoptedCb">Check if adopted</label>
            <input 
                type="checkbox" 
                id="isAdoptedCb"
                checked={isAdopted}
                onChange={(e) => setIsAdopted(e.target.checked)} 
            />
            {isAdopted && 
            <>
            <label htmlFor="adoptiveFatherInput">Adoptive Father</label>
            <input 
                type="text"
                id="adoptiveFatherInput"
                value={adoptedFather}
                onChange={(e) => setAdoptedFather(e.target.value)}    
            />
            <label htmlFor="adoptiveMotherInput">Adoptive Mother</label>
            <input 
                type="text"
                id="adoptiveMotherInput"   
                value={adoptedMother}
                onChange={(e) => setAdoptedMother(e.target.value)} 
            />
            </>
            }
            <p>{message}</p>
        </fieldset>
    )

}