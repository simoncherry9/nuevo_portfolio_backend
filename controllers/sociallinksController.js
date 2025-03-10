const SocialLink = require('../models/sociallinks');
const { validationResult } = require('express-validator'); // Si necesitas validación

// Crear un nuevo enlace social (POST)
exports.createSocialLink = async (req, res) => {
    try {
        const { name, url, icon, category } = req.body;

        // Validación de los campos (opcional)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const socialLink = await SocialLink.create({ name, url, icon, category });
        res.status(201).json({ message: 'Enlace social creado', socialLink });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los enlaces sociales (GET) - Pública
exports.getAllSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLink.findAll();
        res.status(200).json(socialLinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un enlace social (PUT)
exports.updateSocialLink = async (req, res) => {
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

// Eliminar un enlace social (DELETE)
exports.deleteSocialLink = async (req, res) => {
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
