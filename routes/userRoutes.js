const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { createUserValidators, updateUserValidators, deleteUserValidators, loginValidators } = require('../controllers/userController');  // Importar las validaciones

// **Login (POST)**
router.post('/login', loginValidators, userController.login);

// **Registro (POST)**
router.post('/register', createUserValidators, userController.createUser);

// **Obtener todos los usuarios (GET) - Protegida**
router.get('/', authMiddleware, userController.getAllUsers);

// **Actualizar un usuario (PUT) - Protegida y con validación**
router.put('/edit/:id', authMiddleware, updateUserValidators, userController.updateUser);

// **Eliminar un usuario (DELETE) - Protegida y con validación**
router.delete('/remove/:id', authMiddleware, deleteUserValidators, userController.deleteUser);

module.exports = router;
