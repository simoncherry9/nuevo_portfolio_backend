const Skill = require('../models/skills');
const { validationResult } = require('express-validator'); // Para validación, si lo necesitas

// Crear una nueva habilidad (POST)
exports.createSkill = async (req, res) => {
    try {
        const { name, proficiency, category } = req.body;

        // Validación de los campos (opcional)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const skill = await Skill.create({ name, proficiency, category });
        res.status(201).json({ message: 'Habilidad creada', skill });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las habilidades (GET) - Pública
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una habilidad (PUT)
exports.updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, proficiency, category } = req.body;

        const skill = await Skill.findByPk(id);
        if (!skill) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        await skill.update({ name, proficiency, category });
        res.status(200).json({ message: 'Habilidad actualizada', skill });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una habilidad (DELETE)
exports.deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findByPk(id);
        if (!skill) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        await skill.destroy();
        res.status(200).json({ message: 'Habilidad eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
