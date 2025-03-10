const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');  // Importar el middleware de autenticación

// Obtener todos los blog posts (GET) - Esta ruta es pública
router.get('/', blogController.getAllBlogPosts);

// Crear un blog post (POST) - Protegida por autenticación
router.post('/', authMiddleware, blogController.createBlogPost);

// Editar un blog post (PUT) - Protegida por autenticación
router.put('/:id', authMiddleware, blogController.updateBlogPost);

// Eliminar un blog post (DELETE) - Protegida por autenticación
router.delete('/:id', authMiddleware, blogController.deleteBlogPost);

module.exports = router;
