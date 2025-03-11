const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// **Importar las validaciones**
const { createBlogPostValidators, updateBlogPostValidators, deleteBlogPostValidators } = require('../controllers/blogController');

// **Obtener blogs activos**
router.get('/', blogController.getAllBlogPosts);

// **Crear un blog (POST)**
router.post('/', authMiddleware, createBlogPostValidators, blogController.createBlogPost);

// **Editar un blog (PUT)**
router.put('/:id', authMiddleware, updateBlogPostValidators, blogController.updateBlogPost);

// **Eliminar un blog (DELETE)**
router.delete('/:id', authMiddleware, deleteBlogPostValidators, blogController.deleteBlogPost);

// **Activar/desactivar todos los blogs (PUT)**
router.put('/toggle-visibility', authMiddleware, blogController.toggleBlogVisibility);

module.exports = router;
