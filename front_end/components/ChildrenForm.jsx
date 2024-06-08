import React, { useState, useEffect } from "react";
import { NameForm } from "./NameForm";
import axios from "axios";
import { config } from "../src/config";

export const ChildrenForm = ({ children, setChildren, addToChildren }) => {
    const [message, setMessage] = useState('');
    
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const [tempChildren, setTempChildren] = useState([]);

    const name = {
        first: firstName,
        middle: middleName,
        last: lastName
    }
    

    const addChild = () => {
        const tempArray = [...children]
        tempArray.push(selectedPerson)
        setChildren(tempArray)
    };

    useEffect(() => {
       
    }, []);

    

    return (
        <fieldset>
            <legend>Add a child</legend>
            <NameForm 
                first={firstName}
                setFirst={setFirstName}
                middle={middleName}
                setMiddle={setMiddleName}
                last={lastName}
                setLast={setLastName}
                relation={'children'}
            />
            <p>{message}</p>
        </fieldset>
    )
}