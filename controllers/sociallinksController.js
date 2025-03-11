const { validationResult, body, param } = require('express-validator'); 
const SocialLink = require('../models/sociallinks');


const createSocialLinkValidators = [
    body('name').notEmpty().withMessage('El nombre del enlace social es obligatorio').isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('url').notEmpty().withMessage('La URL es obligatoria').isURL().withMessage('La URL debe ser válida'),
    body('icon').optional().isLength({ max: 50 }).withMessage('El icono no puede tener más de 50 caracteres'),
    body('category').optional().isLength({ max: 50 }).withMessage('La categoría no puede tener más de 50 caracteres'),
];


exports.createSocialLink = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, url, icon, category } = req.body;
        const socialLink = await SocialLink.create({ name, url, icon, category });
        res.status(201).json({ message: 'Enlace social creado', socialLink });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLink.findAll();
        res.status(200).json(socialLinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateSocialLinkValidators = [
    param('id').isInt().withMessage('El ID del enlace social debe ser un número entero'),
    body('name').optional().isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('url').optional().isURL().withMessage('La URL debe ser válida'),
    body('icon').optional().isLength({ max: 50 }).withMessage('El icono no puede tener más de 50 caracteres'),
    body('category').optional().isLength({ max: 50 }).withMessage('La categoría no puede tener más de 50 caracteres'),
];


exports.updateSocialLink = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { name, url, icon, category } = req.body;

        const socialLink = await SocialLink.findByPk(id);
        if (!socialLink) {
            return res.status(404).json({ message: 'Enlace social no encontrado' });
        }

        await socialLink.update({ name, url, icon, category });
        res.status(200).json({ message: 'Enlace social actualizado', socialLink });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteSocialLinkValidators = [
    param('id').isInt().withMessage('El ID del enlace social debe ser un número entero'),
];


exports.deleteSocialLink = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const socialLink = await SocialLink.findByPk(id);
        if (!socialLink) {
            return res.status(404).json({ message: 'Enlace social no encontrado' });
        }

        await socialLink.destroy();
        res.status(200).json({ message: 'Enlace social eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createSocialLinkValidators,
    updateSocialLinkValidators,
    deleteSocialLinkValidators,
    createSocialLink: exports.createSocialLink,
    updateSocialLink: exports.updateSocialLink,
    deleteSocialLink: exports.deleteSocialLink,
    getAllSocialLinks: exports.getAllSocialLinks
};
