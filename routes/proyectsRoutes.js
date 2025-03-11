const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/proyectsController');
const authMiddleware = require('../middleware/authMiddleware');


const { createProjectValidators, updateProjectValidators, deleteProjectValidators } = require('../controllers/proyectsController');


router.get('/', projectsController.getAllProjects);


router.get('/active', projectsController.getActiveProjects); 


router.post('/', authMiddleware, createProjectValidators, projectsController.createProject);


router.put('/:id', authMiddleware, updateProjectValidators, projectsController.updateProject);


router.delete('/:id', authMiddleware, deleteProjectValidators, projectsController.deleteProject);

module.exports = router;
