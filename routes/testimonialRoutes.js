const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');
const authMiddleware = require('../middleware/authMiddleware');
const { createTestimonialValidators, updateTestimonialValidators, deleteTestimonialValidators } = require('../controllers/testimonialsController');  // Importar las validaciones

// **Obtener todos los testimonios (GET) - Pública**
router.get('/', testimonialsController.getAllTestimonials);

// **Crear un nuevo testimonio (POST) - Protegida y con validación de entrada**
router.post('/', authMiddleware, createTestimonialValidators, testimonialsController.createTestimonial);

// **Actualizar un testimonio (PUT) - Protegida y con validación de entrada**
router.put('/:id', authMiddleware, updateTestimonialValidators, testimonialsController.updateTestimonial);

// **Eliminar un testimonio (DELETE) - Protegida y con validación de entrada**
router.delete('/:id', authMiddleware, deleteTestimonialValidators, testimonialsController.deleteTestimonial);

module.exports = router;
