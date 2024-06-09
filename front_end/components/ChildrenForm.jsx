import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../src/config";
import { NameForm } from "./NameForm";

export const ChildrenForm = ({ children, addToChildren, personId, handleRelation, isAdopted, setIsAdopted }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const [selectedRelation, setSelectedRelation] = useState('');

    const [matches, setMatches] = useState([]);

    const name = {
        first: firstName,
        middle: middleName,
        last: lastName
    }
    const child = {
        name,
        bio: '',
        dob: '',
        events: [],
        dod: '',
        bioFather: isBioFather ? personId : '',
        bioMother: isBioMother ? personId : '',
        adoptedFather: isAdoptiveFather ? personId : '',
        adoptedMother: isAdoptiveMother ? personId : '',
        children: []
    }

    const addChild = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            //check for existing person
            const res = await axios.get(`${config.apiBaseUrl}/person/search`, {
                params: { firstName, middleName, lastName }
            });
            if (res.status === 200 && res.data.persons.length > 0) {
                setMessage(`Found matches: ${res.message}`)
                setMatches(res.data.persons)
                setLoading(false)
                return
            }
            //create new person
            const createRes = await axios.post(`${config.apiBaseUrl}/person`, child )
            if (createRes.status === 201) {
                addToChildren(createRes.data.id)
                setMessage(`Success: ${createRes.message}`)
                setLoading(false)
                return
            }
            setMessage(`Failed post new child: ${createRes.message}`)
 
        } catch (error) {
            setMessage(`Error: ${error.message}`)
        }
        setLoading(false)
    }

    const RelationsSelector = () => {
        return (
           <>
            <label htmlFor="bioFatherRadio">Biological Father</label>
            <input 
                type="radio"
                name="parentType"
                id="bioFatherCb" 
                value='bioFather'
                checked={selectedRelation === 'bioFather'}
                    onChange={(e) => setSelectedRelation(e.target.value)}   
            />
            <label htmlFor="bioMotherRadio">Biological Mother</label>
            <input 
                type="radio"
                name="parentType"
                id="bioMotherCb"
                value='bioMother'
                checked={selectedRelation === 'bioMother'}
                    onChange={(e) => setSelectedRelation(e.target.value)}    
            />
            <button onClick={() => setIsAdopted(!isAdopted)}>Adopted?</button>
            {isAdopted &&
                 <>
                    <label htmlFor="adopFatherRadio">Adoptive Father</label>
                    <input 
                        type="radio"
                        name="parentType"
                        id="adopFatherRadio"  
                        value='adoptiveFather'
                        checked={selectedRelation === 'adoptiveFather'}
                        onChange={(e) => setSelectedRelation(e.target.value)}
                    />
                    <label htmlFor="adopMotherRadio">Adoptive Mother</label>
                    <input 
                        type="radio"
                        name="parentType"
                        id="adopMotherRadio"  
                        value='adoptiveMother'
                        checked={selectedRelation === 'adoptiveMother'}
                            onChange={(e) => setSelectedRelation(e.target.value)}
                    />    
                </>
            }
            
           </>
        )
    }

    return (
        <fieldset>
            <ul>
                <h3>Children</h3>
                {children.map((child) => <li key={child._id}>{child}</li> )}
            </ul>
            <legend>Add a child</legend>
            <RelationsSelector />
            <NameForm 
                first={firstName}
                setFirst={setFirstName}
                middle={middleName}
                setMiddle={setMiddleName}
                last={lastName}
                setLast={setLastName}
                relation={'children'}
            />

            <button onClick={(e) => addChild(e)}>Add</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                matches && matches.map((match) => (
                    <div key={match._id}> 
                        <p>{match.name.first} {match.name.middle} {match.name.last}</p>
                        <p>AKA {match.name.common}</p>
                        <button onClick={() => handleRelation(relation, match._id)}>Select Person</button>
                    </div>
                ))
            )}
            <p>{message}</p>
        </fieldset>
    )
};