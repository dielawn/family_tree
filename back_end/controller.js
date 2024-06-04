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
        res.status(201).json({ message: 'Added new person to database', id: savedPerson})
    }  catch (error) {
        res.status(500).json({ message: `Error create person: ${error.message}` });
    }
};

//read
exports.view_person = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: `Error view person: ${error.message}` });
    }
}

//update
exports.update_person = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: `Error update person: ${error.message}` });
    }
}

//delete
exports.delete_person = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: `Error delete person: ${error.message}` });
    }
}

