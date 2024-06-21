import React, { useEffect, useState } from "react";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
    const [bioFather, setBioFather] = useState(null);
    const [bioMother, setBioMother] = useState(null);
    //toggle adopted inputs vis
    const [isAdopted, setIsAdopted] = useState(false); 
    const [adoptiveFather, setAdoptiveFather] = useState(null);
    const [adoptiveMother, setAdoptiveMother] = useState(null);
    
    //children
    const [children, setChildren] = useState([]);

    //biography
    const [bio, setBio] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const token = localStorage.getItem('token')
    
    useEffect(() => {
        
        console.log('name', first, middle, last)
    }, [first, middle, last])

    const handleSubmitPerson = async (e) => {
        e.preventDefault();
        try {
            
            const personName = { first, middle, last, maiden, common };
            const newPerson = {
                name: personName,
                bio: bio || '',
                dob: dob || null,
                events: events || [],
                dod: dod || null,
                bio_father: bioFather || null,
                bio_mother: bioMother || null,
                adoptive_father: adoptiveFather || null,
                adoptive_mother: adoptiveMother || null,
                children: children || []
            };
    
            console.log("newPerson to be sent:", newPerson); 
            const isMatch = await searchName(personName.first, personName.middle, personName.last)
            if (isMatch) {
                //render array of matches with select buttons or radios
                return
            } else {
                const res = await axios.post(`${apiBaseUrl}/person`, newPerson, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            });
    
            if (res.status === 201) {
                setMessage(`Success: ${res.data.message}`);
                console.log(`created person id: ${res.data.id}`);
                
            } else {
                setMessage(`Failed submit person: ${res.data.message}`);
            }

            }

        } catch (error) {
            if (error.response) {
                console.error("Error data:", error.response.data);
                console.error("Error status:", error.response.status);
                console.error("Error headers:", error.response.headers);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.error("Error config:", error.config);
        }
    };

    const searchName = async (first, middle, last) => {
        try {
          const res = await axios.get(`${apiBaseUrl}/person/search`, {
            params: { first, middle, last },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (res.status === 404) {
            setMessage(res.data.message);
            return false;
          } else if (res.status === 200) {
            setMessage(`${res.data.length} Matches found`);
            setSearchResults(res.data);
            return true;
          } else {
            setMessage('Error searching for matches');
            return false;
          }
      
        } catch (error) {
          setMessage(`Error checking for duplicates: ${error}`);
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

    useEffect(() => {
        console.log(first)
    }, [first])

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
                {/* <DatesForm 
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
                /> */}


                <button type="submit">Submit</button>
            </form>             
            <p>{message}</p>
        </div>
    )
}