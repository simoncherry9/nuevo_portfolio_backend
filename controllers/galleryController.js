const { validationResult, body, param } = require('express-validator');
const Image = require('../models/gallery');

// **Validaciones para la creación de una imagen**
const createImageValidators = [
    body('url').notEmpty().withMessage('La URL de la imagen es obligatoria').isURL().withMessage('Debe ser una URL válida'),
    body('title').notEmpty().withMessage('El título es obligatorio').isLength({ max: 100 }).withMessage('El título no puede superar los 100 caracteres'),
    body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede superar los 500 caracteres'),
    body('isActive').optional().isBoolean().withMessage('El estado activo debe ser un valor booleano')
];

// **Crear una nueva imagen en la galería (POST)**
exports.createImage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { url, title, description, isActive } = req.body;
        const image = await Image.create({ url, title, description, isActive });
        res.status(201).json({ message: 'Imagen creada', image });
    } catch (error) {
        console.error('Error al crear la imagen:', error);
        res.status(500).json({ error: 'Hubo un error al crear la imagen, inténtalo más tarde.' });
    }
};

// **Obtener todas las imágenes (GET)**
exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        res.status(500).json({ error: 'Hubo un error al obtener las imágenes, inténtalo más tarde.' });
    }
};

// **Obtener solo imágenes activas (GET)**
exports.getActiveImages = async (req, res) => {
    try {
        const images = await Image.findAll({ where: { isActive: true } });
        res.status(200).json(images);
    } catch (error) {
        console.error('Error al obtener las imágenes activas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener las imágenes activas, inténtalo más tarde.' });
    }
};

// **Validaciones para la actualización de una imagen**
const updateImageValidators = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    body('url').optional().isURL().withMessage('Debe ser una URL válida'),
    body('title').optional().isLength({ max: 100 }).withMessage('El título no puede superar los 100 caracteres'),
    body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede superar los 500 caracteres'),
    body('isActive').optional().isBoolean().withMessage('El estado activo debe ser un valor booleano')
];

// **Actualizar una imagen (PUT)**
exports.updateImage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { url, title, description, isActive } = req.body;

        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        await image.update({ url, title, description, isActive });
        res.status(200).json({ message: 'Imagen actualizada', image });
    } catch (error) {
        console.error('Error al actualizar la imagen:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar la imagen, inténtalo más tarde.' });
    }
};

// **Validaciones para la eliminación de una imagen**
const deleteImageValidators = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
];

// **Eliminar una imagen (DELETE)**
exports.deleteImage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        await image.destroy();
        res.status(200).json({ message: 'Imagen eliminada' });
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar la imagen, inténtalo más tarde.' });
    }
};

// **Exportar validaciones y funciones**
module.exports = {
    createImageValidators,
    updateImageValidators,
    deleteImageValidators,
    createImage: exports.createImage,
    updateImage: exports.updateImage,
    deleteImage: exports.deleteImage,
    getAllImages: exports.getAllImages,
    getActiveImages: exports.getActiveImages
};
