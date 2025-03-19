const { validationResult, body, param } = require('express-validator');
const Study = require('../models/estudios');

const createStudyValidators = [
    body('titulo').notEmpty().withMessage('El título es obligatorio').isLength({ max: 255 }),
    body('institucion').notEmpty().withMessage('El nombre de la institución es obligatorio').isLength({ max: 255 }),
    body('startdate').isISO8601().withMessage('Fecha de inicio inválida'),
    body('enddate').optional().isISO8601().withMessage('Fecha de finalización inválida'),
    body('descripcion').optional().isLength({ max: 500 }),
];

const getStudyByIdValidators = [
    param('id').isInt().withMessage('El ID del estudio debe ser un número entero'),
];

const createStudy = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { titulo, institucion, startdate, enddate, descripcion } = req.body;
        if (enddate && new Date(startdate) > new Date(enddate)) return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la de finalización' });
        const study = await Study.create({ titulo, institucion, startdate, enddate, descripcion });
        res.status(201).json({ message: 'Estudio creado', study });
    } catch (error) {
        console.error('Error al crear el estudio:', error);
        res.status(500).json({ error: 'Error al crear el estudio' });
    }
};

const getAllStudies = async (req, res) => {
    try {
        const studies = await Study.findAll();
        res.status(200).json(studies);
    } catch (error) {
        console.error('Error al obtener los estudios:', error);
        res.status(500).json({ error: 'Error al obtener los estudios' });
    }
};

const getActiveStudies = async (req, res) => {
    try {
        const studies = await Study.findAll({ where: { enddate: null } });
        res.status(200).json(studies);
    } catch (error) {
        console.error('Error al obtener los estudios activos:', error);
        res.status(500).json({ error: 'Error al obtener los estudios activos' });
    }
};

const updateStudyValidators = [...getStudyByIdValidators, ...createStudyValidators];

const updateStudy = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { id } = req.params;
        const { titulo, institucion, startdate, enddate, descripcion } = req.body;
        const study = await Study.findByPk(id);
        if (!study) return res.status(404).json({ message: 'Estudio no encontrado' });
        await study.update({ titulo, institucion, startdate, enddate, descripcion });
        res.status(200).json({ message: 'Estudio actualizado', study });
    } catch (error) {
        console.error('Error al actualizar el estudio:', error);
        res.status(500).json({ error: 'Error al actualizar el estudio' });
    }
};

const getStudyById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { id } = req.params;
        const study = await Study.findByPk(id);
        if (!study) return res.status(404).json({ message: 'Estudio no encontrado' });
        res.status(200).json(study);
    } catch (error) {
        console.error('Error al obtener el estudio:', error);
        res.status(500).json({ error: 'Error al obtener el estudio' });
    }
};

const deleteStudyValidators = getStudyByIdValidators;

const deleteStudy = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { id } = req.params;
        const study = await Study.findByPk(id);
        if (!study) return res.status(404).json({ message: 'Estudio no encontrado' });
        await study.destroy();
        res.status(200).json({ message: 'Estudio eliminado' });
    } catch (error) {
        console.error('Error al eliminar el estudio:', error);
        res.status(500).json({ error: 'Error al eliminar el estudio' });
    }
};

module.exports = {
    createStudyValidators,
    updateStudyValidators,
    deleteStudyValidators,
    createStudy,
    updateStudy,
    deleteStudy,
    getAllStudies,
    getActiveStudies,
    getStudyById,
    getStudyByIdValidators
};
