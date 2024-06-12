const Person = require('../models/person');
const Name = require('../models/person')

//create
exports.create_person = async (req, res) => {
    try {
        console.log(req.body.name)
        const { name, bio, dob, events, dod, bio_father, bio_mother, adoptive_father, adoptive_mother, children } = req.body;
        const newPersonName = { first: name.first, middle: name.middle, last: name.last, maiden: name.maiden, common: name.common }
        console.log('newPErsonName',newPersonName)
        // Create a new Person instance with proper nested name object
        const newPerson = new Person({
            name: {
                first: name.first,
                middle: name.middle,
                last: name.last,
                maiden: name.maiden,
                nickname: name.common
            },
            bio,
            dob,
            events,
            dod,
            bio_father,
            bio_mother,
            adoptive_father,
            adoptive_mother,
            children,
            references: [],
            photos: [],
            audio: [],
            video: []
        });
        console.log('newPerson', newPerson)
        if (!name || !name.first || !name.last) {
            return res.status(400).json({ message: 'Name with first and last fields is required' });
        }
        // Check for existing person
        const isMatch = await Person.findOne({ 'name.first': name.first, 'name.middle': name.middle, 'name.last': name.last });
        if (isMatch) {
            return res.status(400).json({ message: 'Person already in database' });
        } else {
            console.log("New person to be saved:", newPerson);
            const savedPerson = await newPerson.save();
            res.status(201).json({ message: 'Added new person to database', id: savedPerson._id });
        }
    } catch (error) {
        
        res.status(500).json({ message: `Error creating person: ${error.message}` });
    }
};
//read by id
exports.view_person = async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
           return  res.status(404).json({ message: 'Person not found' });
        } else {
            res.status(200).json({ message: 'Found person', person });
        }
    } catch (error) {
        res.status(500).json({ message: `Error view person: ${error.message}` });
    }
};
//read by name
exports.search_person_by_name = async (req, res) => {
    try {
        const [ first, middle, last ] = req.query;
        
        let searchCriteria = {};
        if (first) searchCriteria['name.first'] = { $regex: first, $options: 'i' };
        if (middle) searchCriteria['name.middle'] = { $regex: middle, $options: 'i' };
        if (last) searchCriteria['name.last'] = { $regex: last, $options: 'i' };
 
        const persons = await Person.find(searchCriteria)

        if (persons.length === 0) {
            return res.status(404).json({ message: 'No matching persons found'});
        } else {
            res.status(200).json({ message: 'Persons found', persons });
        }

    } catch (error) {
        res.status(500).json({ message: `Error searching persons: ${error.message}` });
    }
};
//read all persons
exports.all_persons = async (req, res) => {
    try {
        const allPersons = await Person.find();
        if (allPersons.length > 0) {
            return res.status(200).json({message: 'Successfully retrieved all persons', persons: allPersons});
        }
        res.status(404).json({message: 'No persons found in database'});
    } catch (error) {
        res.status(500).json({ message: `Error all persons: ${error.message}` });
    }
};


//update
exports.update_person = async (req, res) => {
    try {
        const personToUpdate = await Person.findById(req.params.id)
        if (!personToUpdate) {
           return res.status(404).json({ message: 'Person not found' });
        } else {
            const { first, middle, last, maiden, common, dob, dod, bio_father, bio_mother, adoptive_father, adoptive_mother, children  } = req.body
            //get updated info or use old info
            personToUpdate.name.first = first || personToUpdate.name.first;
            personToUpdate.name.middle = middle || personToUpdate.name.middle;
            personToUpdate.name.last = last || personToUpdate.name.last;
            personToUpdate.name.maiden = maiden || personToUpdate.name.maiden;
            personToUpdate.name.common = common || personToUpdate.name.common;
            personToUpdate.dob = dob || personToUpdate.dob;
            personToUpdate.events = events || personToUpdate.events;
            personToUpdate.dod = dod || personToUpdate.dod;
            personToUpdate.bio_father = bio_father || personToUpdate.bio_father;
            personToUpdate.bio_mother = bio_mother || personToUpdate.bio_mother;
            personToUpdate.adoptive_father = adoptive_father || personToUpdate.adoptive_father;
            personToUpdate.adoptive_mother = adoptive_mother || personToUpdate.adoptive_mother;
            personToUpdate.children = children || personToUpdate.children;

            const updatedPerson = await personToUpdate.save();
            res.status(200).json({ message: 'Person updated', id: updatedPerson._id })
        }
    } catch (error) {
        res.status(500).json({ message: `Error update person: ${error.message}` });
    }
};

//delete
exports.delete_person = async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id)
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
            res.status(200).json({ message: 'Person deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: `Error deleting person: ${error.message}` });
    }
};

