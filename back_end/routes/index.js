const express = require('express');
const router = express.Router();
const controller = require('../controller')

/* GET home page. */
router.get('/', controller.home);

// create new person
router.post('/person', controller.create_person);

// view a person by id
router.get('/person/:id', controller.view_person);

// update person
router.put('/person/:id', controller.update_person);

// delete person
router.delete('/person/:id', controller.delete_person);

module.exports = router;
