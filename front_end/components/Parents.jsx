import React, { useEffect, useState } from "react";
import axios from "axios";
import { NameForm } from "./NameForm";

export const ParentsForm = ({ bioFather, setBioFather, bioMother, setBioMother, isAdopted, setIsAdopted, adoptiveFather, setAdoptedFather, adoptiveMother, setAdoptiveMother, handleRelation}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const initialNameState = {
        first: '',
        middle: '',
        last: '',
    };

    const [bioFatherName, setBioFatherName] = useState(initialNameState);
    const [bioMotherName, setBioMotherName] = useState(initialNameState);
    const [adoptiveFatherName, setAdoptiveFatherName] = useState(adoptiveFather ? adoptiveFather.name : initialNameState);
    const [adoptiveMotherName, setAdoptiveMotherName] = useState(adoptiveMother ? adoptiveMother.name : initialNameState);


    const [matches, setMatches] = useState([])
    const token = localStorage.getItem('token')

    const handleParents = async (first, middle, last, setId) => {
        setLoading(true)
        try {
            //check if person exists            
            console.log(first)
            const res = await axios.get(`${apiBaseUrl}/person/search`, { first, middle, last,},{
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            });
            //if so set matches for selections
            if (res.status === 200 && res.data.persons.length > 0) {
                setMatches(res.data.persons)
                setMessage(`Found person or persons: ${res.data.message}`)
            } else {
                //if not create person, set id
                const createRes = await axios.post(`${apiBaseUrl}/person`, { first, middle, last }, 
                {
                    headers: { 
                        Authorization: `Bearer ${token}`
                    }                     
                })
                if (createRes.status === 201) {
                    setMessage(`Success: ${res.data.message}`)
                    setId(createRes.data.id)
                    
                }
                setMessage(`Failed: ${createRes.data.message}`)
            }
            
        } catch (error) {
            setMessage(`Error: ${error.message}`)
    }
        setLoading(false)
    }

    useEffect(() => {
        if (bioFather && bioFather.name) {
            setBioFatherName(bioFather.name);
        }
    }, [bioFather]);

    useEffect(() => {
        if (bioMother && bioMother.name) {
            setBioMotherName(bioMother.name);
        }
    }, [bioMother]);

    useEffect(() => {
        if (adoptiveFather && adoptiveFather.name) {
            setAdoptiveFatherName(adoptiveFather.name);
        }
    }, [adoptiveFather]);

    useEffect(() => {
        if (adoptiveMother && adoptiveMother.name) {
            setAdoptiveMotherName(adoptiveMother.name);
        }
    }, [adoptiveMother]);


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
                    <div key={match._id} className="matchesDiv">
                        <p>{match.name.first} {match.name.middle} {match.name.last}</p>
                        <p>ID {match._id}</p>
                        <button onClick={() => handleRelation(match.relation, match._id)}>Select Relation</button>
                    </div>
                ))
            )}
            <p>{message}</p>
        </fieldset>
    );
};