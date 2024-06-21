const express = require('express');
const router = express.Router();
const personController = require('./controllers/personController')
const userController = require('./controllers/userController')
const verifyToken = require('./middleware/authMiddleware')

/* GET login page. */
router.get('/', userController.home);

        // USER STUFF //

// login
router.post('/login', userController.login);

//create new user
router.post('/register', userController.create_user);

// view user
router .get('/user/:id', verifyToken, userController.get_user);

// update user
router.put('/user/:id', verifyToken, userController.update_user);

//delete user
router.delete('/user/:id', verifyToken, userController.delete_user);

//add person to user
router.post('/user/:id', verifyToken, userController.user_add_person);


    // PERSON STUFF //
    
// create new person
router.post('/person', verifyToken, personController.create_person);

// view a person by id
router.get('/person/:id', verifyToken, personController.view_person);
// search for a person by name
router.get('/person/search', verifyToken, personController.search_person_by_name);
// all persons
router.get('/persons', verifyToken, personController.all_persons)

// update person
router.put('/person/:id', verifyToken, personController.update_person);

// delete person
router.delete('/person/:id', verifyToken, personController.delete_person);

module.exports = router;
