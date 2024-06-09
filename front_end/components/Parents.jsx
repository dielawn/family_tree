import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../src/config";
import { NameForm } from "./NameForm";

export const ParentsForm = ({ bioFather, setBioFather, bioMother, setBioMother, isAdopted, setIsAdopted, adoptiveFather, setAdoptedFather, adoptiveMother, setAdoptiveMother, handleRelation}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const initialNameState = {
        first: '',
        middle: '',
        last: '',
    };

    const [bioFatherName, setBioFatherName] = useState(bioFather ? bioFather.name : initialNameState);
    const [bioMotherName, setBioMotherName] = useState(bioMother ? bioMother.name : initialNameState);
    const [adoptiveFatherName, setAdoptiveFatherName] = useState(adoptiveFather ? adoptiveFather.name : initialNameState);
    const [adoptiveMotherName, setAdoptiveMotherName] = useState(adoptiveMother ? adoptiveMother.name : initialNameState);


    const [matches, setMatches] = useState([])
 

    const handleParents = async (first, middle, last, setId) => {
        setLoading(true)
        try {
            //check if person exists            
            const res = await axios.get(`${config.apiBaseUrl}/person/search`, {
                params: { first, middle, last,}
            });
            //if so set matches for selections
            if (res.status === 200 && res.data.persons.length > 0) {
                setMatches(res.data.persons)
                setMessage(`Found person or persons: ${res.message}`)
            } else {
                //if not create person, set id
                const createRes = await axios.post(`${config.apiBaseUrl}/person`, {
                   name: { first, middle, last },                     
                })
                if (createRes.status === 201) {
                    setMessage(`Success: ${res.message}`)
                    setId(createRes.data.id)
                    
                }
                setMessage(`Failed: ${createRes.message}`)
            }
            
        } catch (error) {
            setMessage(`Error: ${error.message}`)
    }
        setLoading(false)
    }

    useEffect(() => {
        if (bioFatherName.first && bioFatherName.middle && bioFatherName.last) {
            handleParents(bioFatherName.first, bioFatherName.middle, bioFatherName.last, setBioFather);
        }
    }, [bioFatherName.first, bioFatherName.middle, bioFatherName.last]);

    useEffect(() => {
        if (bioMotherName.first && bioMotherName.middle && bioMotherName.last) {
            handleParents(bioMotherName.first, bioMotherName.middle, bioMotherName.last, setBioMother);
        }
    }, [bioMotherName.first, bioMotherName.middle, bioMotherName.last]);

    useEffect(() => {
        if (isAdopted && adoptiveFatherName.first && adoptiveFatherName.middle && adoptiveFatherName.last) {
            handleParents(adoptiveFatherName.first, adoptiveFatherName.middle, adoptiveFatherName.last, setAdoptedFather);
        }
    }, [adoptiveFatherName.first, adoptiveFatherName.middle, adoptiveFatherName.last, isAdopted]);

    useEffect(() => {
        if (isAdopted && adoptiveMotherName.first && adoptiveMotherName.middle && adoptiveMotherName.last) {
            handleParents(adoptiveMotherName.first, adoptiveMotherName.middle, adoptiveMotherName.last, setAdoptiveMother);
        }
    }, [adoptiveMotherName.first, adoptiveMotherName.middle, adoptiveMotherName.last, isAdopted]);

    return (
        <fieldset>
            <legend>Parents</legend>
            <h3>Biological Father</h3>
            <NameForm 
                relation='bioFather'
                first={bioFatherName.first}
                setFirst={(val) => setBioFatherName({ ...bioFatherName, first: val })}
                middle={bioFatherName.middle}
                setMiddle={(val) => setBioFatherName({ ...bioFatherName, middle: val })}
                last={bioFatherName.last}
                setLast={(val) => setBioFatherName({ ...bioFatherName, last: val })}
            />
            <h3>Biological Mother</h3>
            <NameForm 
                relation='bioMother'
                first={bioMotherName.first}
                setFirst={(val) => setBioMotherName({ ...bioMotherName, first: val })}
                middle={bioMotherName.middle}
                setMiddle={(val) => setBioMotherName({ ...bioMotherName, middle: val })}
                last={bioMotherName.last}
                setLast={(val) => setBioMotherName({ ...bioMotherName, last: val })}
            />
            <button onClick={() => setIsAdopted(!isAdopted)}>Adopted?</button>
            {isAdopted && (
                <>
                    <h3>Adoptive Father</h3>
                    <NameForm 
                        relation='adoptiveFather'
                        first={adoptiveFatherName.first}
                        setFirst={(val) => setAdoptiveFatherName({ ...adoptiveFatherName, first: val })}
                        middle={adoptiveFatherName.middle}
                        setMiddle={(val) => setAdoptiveFatherName({ ...adoptiveFatherName, middle: val })}
                        last={adoptiveFatherName.last}
                        setLast={(val) => setAdoptiveFatherName({ ...adoptiveFatherName, last: val })}
                    />
                    <h3>Adoptive Mother</h3>
                    <NameForm 
                        relation='adoptiveMother'
                        first={adoptiveMotherName.first}
                        setFirst={(val) => setAdoptiveMotherName({ ...adoptiveMotherName, first: val })}
                        middle={adoptiveMotherName.middle}
                        setMiddle={(val) => setAdoptiveMotherName({ ...adoptiveMotherName, middle: val })}
                        last={adoptiveMotherName.last}
                        setLast={(val) => setAdoptiveMotherName({ ...adoptiveMotherName, last: val })}
                    />
                </>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : (
                matches && matches.map((match) => (
                    <div key={match._id}>
                        <p>{match.name.first} {match.name.middle} {match.name.last}</p>
                        <p>AKA {match.name.common}</p>
                        <button onClick={() => handleRelation(match.relation, match._id)}>Select Relation</button>
                    </div>
                ))
            )}
            <p>{message}</p>
        </fieldset>
    );
};