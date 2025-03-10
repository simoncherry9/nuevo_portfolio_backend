const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.login);

router.post('/register', userController.createUser);

router.get('/', authMiddleware, userController.getAllUsers);

router.put('/edit/:id', authMiddleware, userController.updateUser);

router.delete('/remove/:id', authMiddleware, userController.deleteUser);

module.exports = router;
