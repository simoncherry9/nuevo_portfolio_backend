const { validationResult, body, param } = require('express-validator'); // Validación
const Testimonial = require('../models/testimonials');

// **Validaciones para la creación de un testimonio**
const createTestimonialValidators = [
    body('name').notEmpty().withMessage('El nombre es obligatorio').isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('content').notEmpty().withMessage('El contenido es obligatorio').isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('jobTitle').optional().isLength({ max: 50 }).withMessage('El título del trabajo no puede tener más de 50 caracteres'),
    body('company').optional().isLength({ max: 100 }).withMessage('El nombre de la empresa no puede tener más de 100 caracteres'),
];

// **Crear un nuevo testimonio (POST)**
exports.createTestimonial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, content, jobTitle, company } = req.body;
        const testimonial = await Testimonial.create({ name, content, jobTitle, company });
        res.status(201).json({ message: 'Testimonio creado', testimonial });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// **Obtener todos los testimonios (GET) - Pública**
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **Validaciones para la actualización de un testimonio**
const updateTestimonialValidators = [
    param('id').isInt().withMessage('El ID del testimonio debe ser un número entero'),
    body('name').optional().isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('content').optional().isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('jobTitle').optional().isLength({ max: 50 }).withMessage('El título del trabajo no puede tener más de 50 caracteres'),
    body('company').optional().isLength({ max: 100 }).withMessage('El nombre de la empresa no puede tener más de 100 caracteres'),
];

// **Actualizar un testimonio (PUT)**
exports.updateTestimonial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { name, content, jobTitle, company } = req.body;

        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonio no encontrado' });
        }

        await testimonial.update({ name, content, jobTitle, company });
        res.status(200).json({ message: 'Testimonio actualizado', testimonial });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// **Validaciones para la eliminación de un testimonio**
const deleteTestimonialValidators = [
    param('id').isInt().withMessage('El ID del testimonio debe ser un número entero'),
];

// **Eliminar un testimonio (DELETE)**
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

// **Exportar validaciones y funciones**
module.exports = {
    createTestimonialValidators,
    updateTestimonialValidators,
    deleteTestimonialValidators,
    createTestimonial: exports.createTestimonial,
    updateTestimonial: exports.updateTestimonial,
    deleteTestimonial: exports.deleteTestimonial,
    getAllTestimonials: exports.getAllTestimonials
};
