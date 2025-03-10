const { validationResult, body, param } = require('express-validator');  // Para validación, si lo necesitas
const Skill = require('../models/skills');

// **Validaciones para la creación de una habilidad**
const createSkillValidators = [
    body('name').notEmpty().withMessage('El nombre de la habilidad es obligatorio').isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('proficiency').notEmpty().withMessage('El nivel de habilidad es obligatorio').isInt({ min: 1, max: 5 }).withMessage('El nivel de habilidad debe ser un número entre 1 y 5'),
    body('category').notEmpty().withMessage('La categoría es obligatoria').isLength({ max: 50 }).withMessage('La categoría no puede tener más de 50 caracteres'),
];

// **Crear una nueva habilidad (POST)**
exports.createSkill = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, proficiency, category } = req.body;

        const skill = await Skill.create({ name, proficiency, category });
        res.status(201).json({ message: 'Habilidad creada', skill });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// **Obtener todas las habilidades (GET) - Pública**
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **Validaciones para la actualización de una habilidad**
const updateSkillValidators = [
    param('id').isInt().withMessage('El ID de la habilidad debe ser un número entero'),
    body('name').optional().isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('proficiency').optional().isInt({ min: 1, max: 5 }).withMessage('El nivel de habilidad debe ser un número entre 1 y 5'),
    body('category').optional().isLength({ max: 50 }).withMessage('La categoría no puede tener más de 50 caracteres'),
];

// **Actualizar una habilidad (PUT)**
exports.updateSkill = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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

// **Validaciones para la eliminación de una habilidad**
const deleteSkillValidators = [
    param('id').isInt().withMessage('El ID de la habilidad debe ser un número entero'),
];

// **Eliminar una habilidad (DELETE)**
exports.deleteSkill = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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

// **Exportar validaciones y funciones**
module.exports = {
    createSkillValidators,
    updateSkillValidators,
    deleteSkillValidators,
    createSkill: exports.createSkill,
    updateSkill: exports.updateSkill,
    deleteSkill: exports.deleteSkill,
    getAllSkills: exports.getAllSkills
};
