const Person = require('../models/person');
// const Name = require('../models/person')

//create name
// exports.create_name = async (req, res) => {
//     try {
//         console.log('req.body', req.body)
//         const { name } = req.body;

//         // Ensure name fields are provided
//         if (!name || !name.first || !name.last) {
//             return res.status(400).json({ message: 'Name with first and last fields is required' });
//         }
//         console.log('name stuff', name, name.first, name.last)
//         const newPersonName = new Name({ first: req.body.name.first, middle: req.body.name.middle, last: req.body.name.last, maiden: req.body.name.maiden, common: req.body.name.common})
//         await newPersonName.save();
//         res.status(201).json({ message: 'Name saved', name: newPersonName})
//         console.log(newPersonName)
//     } catch (error) {
//         console.error("Error creating Name:", error);
//         res.status(500).json({ message: `Error creating Name: ${error.message}` });
//     }
// };

//create
exports.create_person = async (req, res) => {
    try {
        const { name, bio, dob, dod, bioFather, bioMother, adoptiveFather, adoptiveMother, children, events } = req.body
        const newPerson = new Person({
            name: { first: name.first, middle: name.middle, last: name.last, maiden: name.maiden, common: name.common },
            bio: bio || '',
            dob: dob || null,
            events: events || [],
            dod: dod || null,
            bio_father: bioFather || null,
            bio_mother: bioMother || null,
            adoptive_father: adoptiveFather || null,
            adoptive_mother: adoptiveMother || null,
            children: children || []
        });
        const savedPerson = await newPerson.save();
        // console.log("req.body:", req.body);
        if (savedPerson) {
            // console.log(`Saved person: ${savedPerson._id}`);
            return res.status(201).json({ message: 'Success creating person', id: savedPerson._id });
        }
        res.status(400).json({ message: 'Failed to save person' });
    } catch (error) {
        console.error("Error creating person:", error);
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

        const searchCriteria = {
          'name.first': { $regex: new RegExp(req.query.first, 'i') },
          'name.middle': { $regex: new RegExp(req.query.middle, 'i') },
          'name.last': { $regex: new RegExp(req.query.last, 'i') }
        };
       
        const persons = await Person.find(searchCriteria);
        console.log(`Persons ${persons.length}`);
        if (persons.length === 0) {
            return res.status(404).json({ message: 'No matching persons found' });
        } else {
            res.status(200).json({ message: 'Persons found', persons });
        }

    } catch (error) {
        console.error(`Error searching persons: ${error.message}`);
        res.status(500).json({ message: `Error searching persons: ${error.message}` });
    } finally {
        console.log('Finally block');
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

exports.update_dob = async (req, res) => {
    try {
        console.log('params', req.params)
        console.log('body', req.body)
        const { id } = req.params;
        const { dob } = req.body;
        const personToUpdate = await Person.findById(id);

        if (!personToUpdate) {
            return res.status(404).json({ message: 'Person not found' });
        }
        if (!dob) {
            return res.status(400).json({ message: 'Missing dob parameter' });
        }

        personToUpdate.dob = dob;
        const updatedPerson = await personToUpdate.save();

        res.status(200).json({ message: 'Person updated', id: updatedPerson._id });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Invalid date format dob YYYY-MM-DD' });
        }

        res.status(500).json({ message: `Error updating dob: ${error.message}` });
    }
};

exports.update_dod = async (req, res) => {
    try {
        const { id } = req.params
        const { dod } = req.body;
        console.log(id, dod)

        const personToUpdate = await Person.findById(id);
        if (!personToUpdate) {
            return res.status(404).json({ message: 'Person not found' });
        }
        if (!dod) {
            return res.status(400).json({ message: 'Missing dod parameter' });
        }

        personToUpdate.dod = dod;
        const updatedPerson = await personToUpdate.save();

        res.status(200).json({ message: 'Person updated', id: updatedPerson._id });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Invalid date format dod MM/DD/YYYY' });
        }

        res.status(500).json({ message: `Error updating dod: ${error.message}` });
    }
};

exports.update_events = async (req, res) => {
    
    try {
        const { id } = req.params;
        const events = req.body.events
        console.log('id and events:', id, events)

        const personToUpdate = await Person.findById(id);
        if (!personToUpdate) {
            return res.status(404).json({ message: 'Person not found' });
        }
        if (!events) {
            return res.status(400).json({ message: 'Events not valid' });
        }

        personToUpdate.events = events;
        const updatedPerson = await personToUpdate.save();

        res.status(200).json({ message: 'Person events updated', id: updatedPerson._id})

    } catch (error) {
       
        res.status(500).json({ message: `Error updating events: ${error.message}` });
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

