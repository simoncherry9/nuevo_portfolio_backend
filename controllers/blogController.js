const BlogPost = require('../models/blog');

// Crear un blog (POST)
exports.createBlogPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        // Crear un nuevo blog post
        const blogPost = await BlogPost.create({ title, content, author });
        res.status(201).json({ message: 'Blog creado con éxito', blogPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los blog posts (GET)
exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll();
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un blog post (PUT)
exports.updateBlogPost = async (req, res) => {
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
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un blog post (DELETE)
exports.deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;

        const blogPost = await BlogPost.findByPk(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog no encontrado' });
        }

        await blogPost.destroy();
        res.status(200).json({ message: 'Blog eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
