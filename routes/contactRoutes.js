const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');  // Importar el middleware de autenticación

// Obtener todos los mensajes de contacto (GET) - Ruta protegida por autenticación
router.get('/', authMiddleware, contactController.getAllContactMessages);

// Crear un mensaje de contacto (POST) - Protegida por autenticación
router.post('/', authMiddleware, contactController.createContactMessage);

// Editar un mensaje de contacto (PUT) - Protegida por autenticación
router.put('/:id', authMiddleware, contactController.updateContactMessage);

// Eliminar un mensaje de contacto (DELETE) - Protegida por autenticación
router.delete('/:id', authMiddleware, contactController.deleteContactMessage);

module.exports = router;
