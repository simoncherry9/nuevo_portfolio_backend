const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware de autenticación

// **Importar las validaciones desde el controlador**
const { createExperienceValidators, updateExperienceValidators, deleteExperienceValidators } = require('../controllers/experienceController');

// **Obtener todas las experiencias laborales (GET) - Ruta pública**
router.get('/', experienceController.getAllExperiences);

// **Crear una nueva experiencia laboral (POST) - Protegida por autenticación y validación de entrada**
router.post('/', authMiddleware, createExperienceValidators, experienceController.createExperience);

// **Editar una experiencia laboral (PUT) - Protegida por autenticación y validación de entrada**
router.put('/:id', authMiddleware, updateExperienceValidators, experienceController.updateExperience);

// **Eliminar una experiencia laboral (DELETE) - Protegida por autenticación y validación de entrada**
router.delete('/:id', authMiddleware, deleteExperienceValidators, experienceController.deleteExperience);

module.exports = router;
