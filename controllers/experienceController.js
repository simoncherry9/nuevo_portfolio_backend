const { validationResult, body, param } = require('express-validator');
const Experience = require('../models/experience');


const createExperienceValidators = [
    body('title').notEmpty().withMessage('El título es obligatorio').isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('company').notEmpty().withMessage('El nombre de la empresa es obligatorio').isLength({ max: 100 }).withMessage('El nombre de la empresa no puede tener más de 100 caracteres'),
    body('startDate').isISO8601().withMessage('La fecha de inicio debe ser una fecha válida en formato ISO 8601'),
    body('endDate').optional().isISO8601().withMessage('La fecha de finalización debe ser una fecha válida en formato ISO 8601'),
    body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
];


const createExperience = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, company, startDate, endDate, description } = req.body;

        if (endDate && new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la fecha de finalización' });
        }

        const experience = await Experience.create({ title, company, startDate, endDate, description });
        res.status(201).json({ message: 'Experiencia laboral creada', experience });
    } catch (error) {
        console.error('Error al crear la experiencia laboral:', error);
        res.status(500).json({ error: 'Hubo un error al crear la experiencia laboral, inténtalo más tarde.' });
    }
};


const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll();
        res.status(200).json(experiences);
    } catch (error) {
        console.error('Error al obtener las experiencias laborales:', error);
        res.status(500).json({ error: 'Hubo un error al obtener las experiencias laborales, inténtalo más tarde.' });
    }
};


const getActiveExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll({
            where: {
                endDate: null  
            }
        });
        res.status(200).json(experiences);
    } catch (error) {
        console.error('Error al obtener las experiencias activas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener las experiencias activas, inténtalo más tarde.' });
    }
};


const updateExperienceValidators = [
    param('id').isInt().withMessage('El ID de la experiencia debe ser un número entero'),
    body('title').optional().isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('company').optional().isLength({ max: 100 }).withMessage('El nombre de la empresa no puede tener más de 100 caracteres'),
    body('startDate').optional().isISO8601().withMessage('La fecha de inicio debe ser una fecha válida en formato ISO 8601'),
    body('endDate').optional().isISO8601().withMessage('La fecha de finalización debe ser una fecha válida en formato ISO 8601'),
    body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
];


const updateExperience = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { title, company, startDate, endDate, description, isActive } = req.body;

        const experience = await Experience.findByPk(id);
        if (!experience) {
            return res.status(404).json({ message: 'Experiencia laboral no encontrada' });
        }

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la fecha de finalización' });
        }

        
        const updatedExperience = {
            title,
            company,
            startDate,
            endDate,
            description,
            isActive: isActive ? 1 : 0  
        };

        await experience.update(updatedExperience);
        res.status(200).json({ message: 'Experiencia laboral actualizada', experience: updatedExperience });
    } catch (error) {
        console.error('Error al actualizar la experiencia laboral:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar la experiencia laboral, inténtalo más tarde.' });
    }
};



const deleteExperienceValidators = [
    param('id').isInt().withMessage('El ID de la experiencia debe ser un número entero'),
];


const deleteExperience = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const experience = await Experience.findByPk(id);
        if (!experience) {
            return res.status(404).json({ message: 'Experiencia laboral no encontrada' });
        }

        await experience.destroy();
        res.status(200).json({ message: 'Experiencia laboral eliminada' });
    } catch (error) {
        console.error('Error al eliminar la experiencia laboral:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar la experiencia laboral, inténtalo más tarde.' });
    }
};


module.exports = {
    createExperienceValidators,
    updateExperienceValidators,
    deleteExperienceValidators,
    createExperience,
    updateExperience,
    deleteExperience,
    getAllExperiences,
    getActiveExperiences
};
