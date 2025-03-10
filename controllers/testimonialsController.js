const Testimonial = require('../models/testimonials');
const { validationResult } = require('express-validator'); // Si necesitas validación

// Crear un nuevo testimonio (POST)
exports.createTestimonial = async (req, res) => {
    try {
        const { name, content, jobTitle, company } = req.body;

        // Validación de los campos (opcional)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const testimonial = await Testimonial.create({ name, content, jobTitle, company });
        res.status(201).json({ message: 'Testimonio creado', testimonial });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los testimonios (GET) - Pública
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un testimonio (PUT)
exports.updateTestimonial = async (req, res) => {
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

// Eliminar un testimonio (DELETE)
exports.deleteTestimonial = async (req, res) => {
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
