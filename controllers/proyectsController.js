const Project = require('../models/proyects');
const { validationResult } = require('express-validator'); // Para validación, si lo necesitas

// Crear un nuevo proyecto (POST)
exports.createProject = async (req, res) => {
    try {
        const { title, description, technologies, link } = req.body;

        // Validación de los campos (opcional)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const project = await Project.create({ title, description, technologies, link });
        res.status(201).json({ message: 'Proyecto creado', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los proyectos (GET) - Pública
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un proyecto (PUT)
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, technologies, link } = req.body;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        await project.update({ title, description, technologies, link });
        res.status(200).json({ message: 'Proyecto actualizado', project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un proyecto (DELETE)
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        await project.destroy();
        res.status(200).json({ message: 'Proyecto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
