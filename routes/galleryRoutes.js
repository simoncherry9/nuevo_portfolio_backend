const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');  

// **Importar las validaciones desde el controlador**
const { createImageValidators, updateImageValidators, deleteImageValidators } = require('../controllers/galleryController');

// **Obtener todas las imágenes (GET) - Ruta pública**
router.get('/', galleryController.getAllImages);

// **Crear una nueva imagen (POST) - Protegida por autenticación y validación de entrada**
router.post('/', authMiddleware, createImageValidators, galleryController.createImage);

// **Actualizar una imagen (PUT) - Protegida por autenticación y validación de entrada**
router.put('/:id', authMiddleware, updateImageValidators, galleryController.updateImage);

// **Eliminar una imagen (DELETE) - Protegida por autenticación y validación de entrada**
router.delete('/:id', authMiddleware, deleteImageValidators, galleryController.deleteImage);

module.exports = router;
