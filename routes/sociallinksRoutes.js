const express = require('express');
const router = express.Router();
const socialLinksController = require('../controllers/sociallinksController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los enlaces sociales (GET) - Pública
router.get('/', socialLinksController.getAllSocialLinks);

// Crear un nuevo enlace social (POST) - Protegida
router.post('/', authMiddleware, socialLinksController.createSocialLink);

// Actualizar un enlace social (PUT) - Protegida
router.put('/:id', authMiddleware, socialLinksController.updateSocialLink);

// Eliminar un enlace social (DELETE) - Protegida
router.delete('/:id', authMiddleware, socialLinksController.deleteSocialLink);

module.exports = router;
