const { validationResult, body, param } = require('express-validator');  
const BlogPost = require('../models/blog');

// **Validaciones para la creación de un blog**
const createBlogPostValidators = [
    body('title').notEmpty().withMessage('El título es obligatorio').isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('content').notEmpty().withMessage('El contenido es obligatorio').isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('author').notEmpty().withMessage('El autor es obligatorio').isLength({ max: 50 }).withMessage('El autor no puede tener más de 50 caracteres'),
];

// **Crear un blog (POST)**
exports.createBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content, author } = req.body;

        // Crear un nuevo blog post
        const blogPost = await BlogPost.create({ title, content, author });
        res.status(201).json({ message: 'Blog creado con éxito', blogPost });
    } catch (error) {
        console.error('Error al crear el blog:', error);
        res.status(500).json({ error: 'Hubo un error al crear el blog, inténtalo más tarde.' });
    }
};

// **Validaciones para la actualización de un blog**
const updateBlogPostValidators = [
    param('id').isInt().withMessage('El ID del blog debe ser un número entero'),  
    body('title').optional().isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('content').optional().isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('author').optional().isLength({ max: 50 }).withMessage('El autor no puede tener más de 50 caracteres'),
];

// **Actualizar un blog post (PUT)**
exports.updateBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        const blogPost = await BlogPost.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog no encontrado' });
        }

        await blogPost.update({ title, content, author });
        res.status(200).json({ message: 'Blog actualizado con éxito', blogPost });
    } catch (error) {
        console.error('Error al actualizar el blog:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el blog, inténtalo más tarde.' });
    }
};

// **Validaciones para la eliminación de un blog**
const deleteBlogPostValidators = [
    param('id').isInt().withMessage('El ID del blog debe ser un número entero'),
];

// **Eliminar un blog post (DELETE)**
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
        res.status(200).json({ message: 'Blog eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el blog:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el blog, inténtalo más tarde.' });
    }
};

// **Obtener todos los blog posts (GET)**
exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll();
        res.status(200).json(blogPosts);
    } catch (error) {
        console.error('Error al obtener los blogs:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los blogs, inténtalo más tarde.' });
    }
};

// Exportar las validaciones correctamente
module.exports = {
    createBlogPostValidators,
    updateBlogPostValidators,
    deleteBlogPostValidators,
    createBlogPost: exports.createBlogPost,
    updateBlogPost: exports.updateBlogPost,
    deleteBlogPost: exports.deleteBlogPost,
    getAllBlogPosts: exports.getAllBlogPosts
};
