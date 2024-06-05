const express = require('express');
const router = express.Router();
const personController = require('../personController')

/* GET login page. */
router.get('/', personController.login);

// 




// create new person
router.post('/person', personController.create_person);

// view a person by id
router.get('/person/:id', personController.view_person);

// update person
router.put('/person/:id', personController.update_person);

// delete person
router.delete('/person/:id', personController.delete_person);

module.exports = router;
