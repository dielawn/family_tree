import React, { useEffect, useState } from "react";
import NameForm from './NameForm'
import Select from 'react-select'

const AddRelation = () => {
    
    const [first, setFirst] = useState('');
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');
    const [maiden, setMaiden] = useState('');
    const [common, setCommon] = useState('');
    const [selectedRelation, setSelectedRelation] = useState(null)
    const [personToUpdate, setPersonToUpdate] = useState(null)
    
    const relationOptions = [ 
        { value: 'bioFather', label: 'Biological Father' }, 
        { value: 'bioMother', label: 'Biological Mother'}, 
        { value: 'adoptiveFather', label: 'Adoptive Father' }, 
        { value: 'adoptiveMother', label: 'Adoptive Mother' }, 
        { value: 'children', label: 'Child' }, 
        { value: 'spouse', label: 'Spouse' }, 
        { value: 'siblings', label: 'Sibling' }
    ]


    const handleChange = (value) => setSelectedRelation(value);


    const handleRelation = () => {
        console.log('This relation has not been handled')
    };

    return (
        <div>
               <Select 
                options={relationOptions} 
                onChange={handleChange}    
            />
        <NameForm 
            relation={selectedRelation}
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
            setSelectedRelationPerson={} 
        />
        </div>
    )
}