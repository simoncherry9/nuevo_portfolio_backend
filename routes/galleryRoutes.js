const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las imágenes (GET) - Pública
router.get('/', galleryController.getAllImages);

// Crear una nueva imagen (POST) - Protegida
router.post('/', authMiddleware, galleryController.createImage);

// Actualizar una imagen (PUT) - Protegida
router.put('/:id', authMiddleware, galleryController.updateImage);

// Eliminar una imagen (DELETE) - Protegida
router.delete('/:id', authMiddleware, galleryController.deleteImage);

module.exports = router;
