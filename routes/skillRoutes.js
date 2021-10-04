const express = require('express');

const skillController = require('../controllers/skillController');

const router = express.Router(); // creates a new router

router.route('/').get(skillController.getAllSkills);
router.route('/:category').get(skillController.getSkillsByCategory);

module.exports = router;
