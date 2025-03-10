const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware de autenticación

// Obtener todas las experiencias laborales (GET) - Ruta pública
router.get('/', experienceController.getAllExperiences);

// Crear una nueva experiencia laboral (POST) - Protegida por autenticación
router.post('/', authMiddleware, experienceController.createExperience);

// Editar una experiencia laboral (PUT) - Protegida por autenticación
router.put('/:id', authMiddleware, experienceController.updateExperience);

// Eliminar una experiencia laboral (DELETE) - Protegida por autenticación
router.delete('/:id', authMiddleware, experienceController.deleteExperience);

module.exports = router;
