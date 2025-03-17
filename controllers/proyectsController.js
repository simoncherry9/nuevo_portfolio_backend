const { validationResult, body, param } = require('express-validator');
const Project = require('../models/proyects');

const createProjectValidators = [
    body('title').notEmpty().withMessage('El título es obligatorio').isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('technologies').optional().isString().isLength({ max: 500 }).withMessage('Las tecnologías deben ser una cadena de caracteres'),
    body('link').optional().isURL().withMessage('El enlace debe ser una URL válida'),
    body('isActive').optional().isBoolean().withMessage('El estado activo debe ser un valor booleano'),
    body('image1url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 1 no puede tener más de 500 caracteres'),
    body('image2url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 2 no puede tener más de 500 caracteres'),
    body('image3url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 3 no puede tener más de 500 caracteres'),
    body('image4url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 4 no puede tener más de 500 caracteres'),
    body('image5url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 5 no puede tener más de 500 caracteres')
];

exports.createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, technologies, link, isActive, image1url, image2url, image3url, image4url, image5url } = req.body;

        const project = await Project.create({
            title,
            description,
            technologies,
            link,
            isActive,
            image1url,
            image2url,
            image3url,
            image4url,
            image5url
        });

        res.status(201).json({ message: 'Proyecto creado', project });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ error: 'Hubo un error al crear el proyecto, inténtalo más tarde.' });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los proyectos, inténtalo más tarde.' });
    }
};

exports.getActiveProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({ where: { isActive: true } });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener los proyectos activos:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los proyectos activos, inténtalo más tarde.' });
    }
};

const updateProjectValidators = [
    param('id').isInt().withMessage('El ID del proyecto debe ser un número entero'),
    body('title').optional().isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('technologies').optional().isString().isLength({ max: 500 }).withMessage('Las tecnologías deben ser una cadena de caracteres'),
    body('link').optional().isURL().withMessage('El enlace debe ser una URL válida'),
    body('isActive').optional().isBoolean().withMessage('El estado activo debe ser un valor booleano'),
    body('image1url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 1 no puede tener más de 500 caracteres'),
    body('image2url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 2 no puede tener más de 500 caracteres'),
    body('image3url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 3 no puede tener más de 500 caracteres'),
    body('image4url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 4 no puede tener más de 500 caracteres'),
    body('image5url').optional().isString().isLength({ max: 500 }).withMessage('La imagen 5 no puede tener más de 500 caracteres')
];

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { title, description, technologies, link, isActive, image1url, image2url, image3url, image4url, image5url } = req.body;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        await project.update({
            title,
            description,
            technologies,
            link,
            isActive,
            image1url,
            image2url,
            image3url,
            image4url,
            image5url
        });
        res.status(200).json({ message: 'Proyecto actualizado', project });
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el proyecto, inténtalo más tarde.' });
    }
};

const deleteProjectValidators = [
    param('id').isInt().withMessage('El ID del proyecto debe ser un número entero')
];

exports.deleteProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        await project.destroy();
        res.status(200).json({ message: 'Proyecto eliminado' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el proyecto, inténtalo más tarde.' });
    }
};

module.exports = {
    createProjectValidators,
    updateProjectValidators,
    deleteProjectValidators,
    createProject: exports.createProject,
    getAllProjects: exports.getAllProjects,
    updateProject: exports.updateProject,
    deleteProject: exports.deleteProject,
    getActiveProjects: exports.getActiveProjects
};
