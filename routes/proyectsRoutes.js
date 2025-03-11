const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/proyectsController');
const authMiddleware = require('../middleware/authMiddleware');

// **Importar las validaciones desde el controlador**
const { createProjectValidators, updateProjectValidators, deleteProjectValidators } = require('../controllers/proyectsController');

// **Obtener todos los proyectos (GET) - Ruta pública**
router.get('/', projectsController.getAllProjects);

// **Obtener solo proyectos activos (GET) - Ruta pública**
router.get('/active', projectsController.getActiveProjects); // Ruta para obtener solo proyectos activos

// **Crear un nuevo proyecto (POST) - Protegida por autenticación y validación de entrada**
router.post('/', authMiddleware, createProjectValidators, projectsController.createProject);

// **Editar un proyecto (PUT) - Protegida por autenticación y validación de entrada**
router.put('/:id', authMiddleware, updateProjectValidators, projectsController.updateProject);

// **Eliminar un proyecto (DELETE) - Protegida por autenticación y validación de entrada**
router.delete('/:id', authMiddleware, deleteProjectValidators, projectsController.deleteProject);

module.exports = router;
