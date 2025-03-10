const Image = require('../models/gallery');
const { validationResult } = require('express-validator'); // Para validar los inputs, opcional

// Crear una nueva imagen en la galería (POST)
exports.createImage = async (req, res) => {
    try {
        const { url, title, description } = req.body;

        // Validación de los campos (opcional)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const image = await Image.create({ url, title, description });
        res.status(201).json({ message: 'Imagen creada', image });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las imágenes (GET)
exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una imagen (PUT)
exports.updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, title, description } = req.body;

        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        await image.update({ url, title, description });
        res.status(200).json({ message: 'Imagen actualizada', image });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una imagen (DELETE)
exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        await image.destroy();
        res.status(200).json({ message: 'Imagen eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
