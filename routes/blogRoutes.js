const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware de autenticación

// **Importar las validaciones desde el controlador**
const { createBlogPostValidators, updateBlogPostValidators, deleteBlogPostValidators } = require('../controllers/blogController');

// **Obtener todos los blog posts (GET) - Esta ruta es pública**
router.get('/', blogController.getAllBlogPosts);

// **Crear un blog post (POST) - Protegida por autenticación y validación de entrada**
router.post('/', authMiddleware, createBlogPostValidators, blogController.createBlogPost);

// **Editar un blog post (PUT) - Protegida por autenticación y validación de entrada**
router.put('/:id', authMiddleware, updateBlogPostValidators, blogController.updateBlogPost);

// **Eliminar un blog post (DELETE) - Protegida por autenticación y validación de entrada**
router.delete('/:id', authMiddleware, deleteBlogPostValidators, blogController.deleteBlogPost);

module.exports = router;
