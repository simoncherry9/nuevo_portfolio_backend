const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/proyectsController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los proyectos (GET) - Pública
router.get('/', projectsController.getAllProjects);

// Crear un nuevo proyecto (POST) - Protegida
router.post('/', authMiddleware, projectsController.createProject);

// Actualizar un proyecto (PUT) - Protegida
router.put('/:id', authMiddleware, projectsController.updateProject);

// Eliminar un proyecto (DELETE) - Protegida
router.delete('/:id', authMiddleware, projectsController.deleteProject);

module.exports = router;
