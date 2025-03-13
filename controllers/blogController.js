const { validationResult, body, param } = require('express-validator');
const BlogPost = require('../models/blog');

const createBlogPostValidators = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('content')
        .notEmpty().withMessage('El contenido es obligatorio')
        .isLength({ min: 10 }).withMessage('Mínimo 10 caracteres'),
    body('author')
        .notEmpty().withMessage('El autor es obligatorio')
        .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),
    body('imageUrl')
        .optional().isURL().withMessage('La URL de la imagen no es válida'),
];

exports.createBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content, author, imageUrl } = req.body;
        const blogPost = await BlogPost.create({ title, content, author, imageUrl });

        return res.status(201).json({ message: 'Blog creado con éxito', blogPost });
    } catch (error) {
        console.error('Error al crear el blog:', error);
        return res.status(500).json({ error: 'Hubo un error al crear el blog, inténtalo más tarde.' });
    }
};

const updateBlogPostValidators = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    body('title').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('content').optional().isLength({ min: 10 }).withMessage('Mínimo 10 caracteres'),
    body('author').optional().isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),
    body('imageUrl').optional().isURL().withMessage('La URL de la imagen no es válida'),
];

exports.updateBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const updates = req.body;

        const blogPost = await BlogPost.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog no encontrado' });
        }

        await blogPost.update(updates);

        return res.status(200).json({ message: 'Blog actualizado con éxito', blogPost });
    } catch (error) {
        console.error('Error al actualizar el blog:', error);
        return res.status(500).json({ error: 'Hubo un error al actualizar el blog, inténtalo más tarde.' });
    }
};

const deleteBlogPostValidators = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
];

exports.deleteBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const blogPost = await BlogPost.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog no encontrado' });
        }

        await blogPost.destroy();
        return res.status(200).json({ message: 'Blog eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el blog:', error);
        return res.status(500).json({ error: 'Hubo un error al eliminar el blog, inténtalo más tarde.' });
    }
};

exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll({ where: { isActive: true } });
        return res.status(200).json(blogPosts);
    } catch (error) {
        console.error('Error al obtener los blogs:', error);
        return res.status(500).json({ error: 'Hubo un error al obtener los blogs, inténtalo más tarde.' });
    }
};

const toggleBlogVisibilityValidators = [
    body('isActive').isBoolean().withMessage('El estado de visibilidad debe ser un valor booleano'),
];

exports.toggleBlogVisibility = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { isActive } = req.body;

        await BlogPost.update({ isActive }, { where: {} });

        return res.status(200).json({ message: `Los blogs fueron ${isActive ? 'habilitados' : 'deshabilitados'}` });
    } catch (error) {
        console.error('Error al cambiar visibilidad:', error);
        return res.status(500).json({ error: 'Hubo un error, inténtalo más tarde.' });
    }
};

module.exports = {
    createBlogPostValidators,
    updateBlogPostValidators,
    deleteBlogPostValidators,
    toggleBlogVisibilityValidators,
    createBlogPost: exports.createBlogPost,
    updateBlogPost: exports.updateBlogPost,
    deleteBlogPost: exports.deleteBlogPost,
    getAllBlogPosts: exports.getAllBlogPosts,
    toggleBlogVisibility: exports.toggleBlogVisibility,
};
