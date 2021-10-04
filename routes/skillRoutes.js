const express = require('express');

const skillController = require('../controllers/skillController');

const router = express.Router(); // creates a new router

router.route('/').get(skillController.getAllSkills);

module.exports = router;