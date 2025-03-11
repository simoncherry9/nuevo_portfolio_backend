const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');
const authMiddleware = require('../middleware/authMiddleware');
const { createTestimonialValidators, updateTestimonialValidators, deleteTestimonialValidators } = require('../controllers/testimonialsController'); 

router.get('/active', testimonialsController.getAllActiveTestimonials);

router.get('/', testimonialsController.getAllTestimonials);

router.post('/', authMiddleware, createTestimonialValidators, testimonialsController.createTestimonial);

router.put('/:id', authMiddleware, updateTestimonialValidators, testimonialsController.updateTestimonial);

router.delete('/:id', authMiddleware, deleteTestimonialValidators, testimonialsController.deleteTestimonial);

module.exports = router;
