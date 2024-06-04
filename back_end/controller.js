const Person = require('./models/person');

// home or login page
exports.home = (req, res) => {
    res.render('index', { title: 'Welcome' });
};


//create
exports.create_person = async (req, res) => {
    try {
        const { first, middle, last, dob, dod, bio_father, bio_mother  } = req.body
        const newPerson = {
            name: { first, middle, last },
            dob,
            dod,
            bio_father,
            bio_mother,
        }        
        const savedPerson = await newPerson.save();
        res.status(201).json({ message: 'Added new person to database', id: savedPerson});
    }  catch (error) {
        res.status(500).json({ message: `Error create person: ${error.message}` });
    }
};

//read
exports.view_person = async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            res.status(404).json({ message: 'Person not found' });
        } else {
            res.status(200).json({ message: 'Found person', person });
        }
    } catch (error) {
        res.status(500).json({ message: `Error view person: ${error.message}` });
    }
};

//update
exports.update_person = async (req, res) => {
    try {
        const personToUpdate = await Person.findById(req.params.id)
        if (!personToUpdate) {
            res.status(404).json({ message: 'Person not found' });
        } else {
            const { first, middle, last, dob, dod, bio_father, bio_mother  } = req.body
            //get updated info or use old info
            personToUpdate.name.first = first || personToUpdate.name.first;
            personToUpdate.name.middle = middle || personToUpdate.name.middle;
            personToUpdate.name.last = last || personToUpdate.name.last;
            personToUpdate.dob = dob || personToUpdate.dob;
            personToUpdate.dod = dod || personToUpdate.dod;
            personToUpdate.bio_father = bio_father || personToUpdate.bio_father;
            personToUpdate.bio_mother = bio_mother || personToUpdate.bio_mother;

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
            res.status(404).json({ message: 'Person not found' });
        } else {
            res.status(200).json({ message: 'Person deleted successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: `Error deleting person: ${error.message}` });
    }
};

