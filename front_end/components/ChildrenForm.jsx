import React, { useState, useEffect } from "react";
import { NameForm } from "./NameForm";

const ChildrenForm = ({ children, setChildren }) => {
    const [message, setMessage] = useState('')
    const [child, setChild] = useState('')

    const searchForPerson = async () => {
        try {
            // api call to search for person with childs name
            //if so push child to children array
            //else create new person with name form

        } catch (error) {
            setMessage(`Error: ${error.message}`)
        }
    }

    return (
        <fieldset>
            <legend>Add a child</legend>
        </fieldset>
    )
}