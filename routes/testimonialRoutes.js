const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los testimonios (GET) - Pública
router.get('/', testimonialsController.getAllTestimonials);

// Crear un nuevo testimonio (POST) - Protegida
router.post('/', authMiddleware, testimonialsController.createTestimonial);

// Actualizar un testimonio (PUT) - Protegida
router.put('/:id', authMiddleware, testimonialsController.updateTestimonial);

// Eliminar un testimonio (DELETE) - Protegida
router.delete('/:id', authMiddleware, testimonialsController.deleteTestimonial);

module.exports = router;
