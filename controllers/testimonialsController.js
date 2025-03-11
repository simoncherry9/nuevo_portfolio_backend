const { validationResult, body, param } = require('express-validator'); 
const Testimonial = require('../models/testimonials');


const createTestimonialValidators = [
    body('name').notEmpty().withMessage('El nombre es obligatorio').isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('content').notEmpty().withMessage('El contenido es obligatorio').isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('jobTitle').optional().isLength({ max: 50 }).withMessage('El título del trabajo no puede tener más de 50 caracteres'),
    body('company').optional().isLength({ max: 100 }).withMessage('El nombre de la empresa no puede tener más de 100 caracteres'),
    body('isActive').optional().isBoolean().withMessage('isActive debe ser un valor booleano') 
];


exports.createTestimonial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, content, jobTitle, company, isActive = true } = req.body; 
        const testimonial = await Testimonial.create({ name, content, jobTitle, company, isActive });
        res.status(201).json({ message: 'Testimonio creado', testimonial });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllActiveTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({ where: { isActive: true } }); 
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateTestimonialValidators = [
    param('id').isInt().withMessage('El ID del testimonio debe ser un número entero'),
    body('name').optional().isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('content').optional().isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('jobTitle').optional().isLength({ max: 50 }).withMessage('El título del trabajo no puede tener más de 50 caracteres'),
    body('company').optional().isLength({ max: 100 }).withMessage('El nombre de la empresa no puede tener más de 100 caracteres'),
    body('isActive').optional().isBoolean().withMessage('isActive debe ser un valor booleano') 
];


exports.updateTestimonial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { name, content, jobTitle, company, isActive } = req.body;

        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonio no encontrado' });
        }

        await testimonial.update({ name, content, jobTitle, company, isActive });
        res.status(200).json({ message: 'Testimonio actualizado', testimonial });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteTestimonialValidators = [
    param('id').isInt().withMessage('El ID del testimonio debe ser un número entero'),
];


exports.deleteTestimonial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonio no encontrado' });
        }

        await testimonial.destroy();
        res.status(200).json({ message: 'Testimonio eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createTestimonialValidators,
    updateTestimonialValidators,
    deleteTestimonialValidators,
    createTestimonial: exports.createTestimonial,
    updateTestimonial: exports.updateTestimonial,
    deleteTestimonial: exports.deleteTestimonial,
    getAllTestimonials: exports.getAllTestimonials,
    getAllActiveTestimonials: exports.getAllActiveTestimonials
};
