const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware de autenticación

// **Importar las validaciones desde el controlador**
const { createContactMessageValidators, updateContactMessageValidators, deleteContactMessageValidators } = require('../controllers/contactController');

// **Obtener todos los mensajes de contacto (GET) - Ruta protegida por autenticación**
router.get('/', authMiddleware, contactController.getAllContactMessages);

// **Crear un mensaje de contacto (POST) - Protegida por autenticación y validación de entrada**
router.post('/', authMiddleware, createContactMessageValidators, contactController.createContactMessage);

// **Editar un mensaje de contacto (PUT) - Protegida por autenticación y validación de entrada**
router.put('/:id', authMiddleware, updateContactMessageValidators, contactController.updateContactMessage);

// **Eliminar un mensaje de contacto (DELETE) - Protegida por autenticación y validación de entrada**
router.delete('/:id', authMiddleware, deleteContactMessageValidators, contactController.deleteContactMessage);

module.exports = router;
