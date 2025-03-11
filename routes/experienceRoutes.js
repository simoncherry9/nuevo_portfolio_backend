const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware de autenticación

const { createExperienceValidators, updateExperienceValidators, deleteExperienceValidators } = experienceController;

// **Obtener todas las experiencias laborales (GET) - Ruta pública**
router.get('/', experienceController.getAllExperiences);

// **Obtener experiencias laborales activas (GET) - Ruta pública**
router.get('/active', experienceController.getActiveExperiences);

// **Crear una nueva experiencia laboral (POST) - Protegida**
router.post('/', authMiddleware, createExperienceValidators, experienceController.createExperience);

// **Editar una experiencia laboral (PUT) - Protegida**
router.put('/:id', authMiddleware, updateExperienceValidators, experienceController.updateExperience);

// **Eliminar una experiencia laboral (DELETE) - Protegida**
router.delete('/:id', authMiddleware, deleteExperienceValidators, experienceController.deleteExperience);

module.exports = router;
