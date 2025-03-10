const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware para proteger rutas

// Ruta para login (POST)
router.post('/login', userController.login);

// Ruta para registrar un usuario (POST)
router.post('/register', userController.createUser);

// Ruta para obtener todos los usuarios (GET) - Solo accesible para usuarios logueados
router.get('/', authMiddleware, userController.getAllUsers);

// Ruta para editar un usuario (PUT) - Solo accesible para usuarios logueados
router.put('/edit/:id', authMiddleware, userController.updateUser);

// Ruta para eliminar un usuario (DELETE) - Solo accesible para usuarios logueados
router.delete('/remove/:id', authMiddleware, userController.deleteUser);

module.exports = router;
