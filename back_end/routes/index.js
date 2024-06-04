const express = require('express');
const router = express.Router();
const controller = require('../controller')

/* GET home page. */
router.get('/', controller.home);

// view a person by id
router.get('/person/:id', controller.person)

module.exports = router;
