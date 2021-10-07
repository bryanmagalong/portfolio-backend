const express = require('express');

const projectController = require('../controllers/projectController');

const router = express.Router();

router.route('/').get(projectController.getAllProjects);
router.route('/:id').get(projectController.getProject);
router.route('/byTag/:tag').get(projectController.getProjectsByTag);

module.exports = router;
