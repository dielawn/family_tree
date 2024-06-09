import React, { useState, useEffect } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export const FamilyTree = () => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [persons, setPersons] = useState([]);
    const [tree, setTree] = useState(null);
    
    const fetchAllPersons = async () => {
        setLoading(true)
        try {
            //get all Persons
            const res = await axios.get(`${apiBaseUrl}/persons`);
            if (res.status === 200) {
                setPersons(res.data.persons)
                setMessage(`Persons data set: ${res.data.message}`)
                const treeData = buildFamilyTree(res.data.persons);
                setTree(treeData);
            }

        } catch (error) {
            setMessage(`Error: ${error.message}`)
        }
        setLoading(false)
    };

    useEffect(() => {
        fetchAllPersons();
    }, []);

    const buildFamilyTree = (persons) => {
        const personMap = {};
        persons.forEach(person => personMap[person._id] = { ...person, children: [] });

        const tree = [];
        persons.forEach(person => {
            if (person.bio_father && personMap[person.bio_father]) {
                personMap[person.bio_father].children.push(personMap[person._id]);
            } else if (person.bio_mother && personMap[person.bio_mother]) {
                personMap[person.bio_mother].children.push(personMap[person._id])
            } else {
                tree.push(personMap[person._id]);
            }
        })
        return tree;
    };

    const renderPersonNode =(person) => (
        <div key={person._id} className="node">
            <p>{person.name.first} {person.name.middle} {person.name.last}</p>
            {person.children && person.children.length > 0 && (
                <div>
                    {person.children.map(child => renderPersonNode(child))}
                </div>
            )}
        </div>
    );

    return (
        <div>
            {loading ? 
            ( <p>Loading...</p>
            ) : ( 
            <div>
                <p>{message}</p>
                {tree && tree.map(rootPerson => renderPersonNode(rootPerson))}
            </div>
            )}
        </div>
    );
};