const express = require('express');
const router = express.Router();
const socialLinksController = require('../controllers/sociallinksController');
const authMiddleware = require('../middleware/authMiddleware');
const { createSocialLinkValidators, updateSocialLinkValidators, deleteSocialLinkValidators } = require('../controllers/sociallinksController');  // Importar las validaciones

// **Obtener todos los enlaces sociales (GET) - Pública**
router.get('/', socialLinksController.getAllSocialLinks);

// **Crear un nuevo enlace social (POST) - Protegida y con validación de entrada**
router.post('/', authMiddleware, createSocialLinkValidators, socialLinksController.createSocialLink);

// **Actualizar un enlace social (PUT) - Protegida y con validación de entrada**
router.put('/:id', authMiddleware, updateSocialLinkValidators, socialLinksController.updateSocialLink);

// **Eliminar un enlace social (DELETE) - Protegida y con validación de entrada**
router.delete('/:id', authMiddleware, deleteSocialLinkValidators, socialLinksController.deleteSocialLink);

module.exports = router;
