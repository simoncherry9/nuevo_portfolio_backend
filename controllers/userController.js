const { validationResult, body, param } = require('express-validator'); // Validación
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// **Validaciones para la creación de un usuario**
const createUserValidators = [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio').isLength({ max: 50 }).withMessage('El nombre de usuario no puede tener más de 50 caracteres'),
    body('email').isEmail().withMessage('El email es obligatorio y debe ser válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

// **Crear un nuevo usuario (POST)**
exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario creado', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// **Obtener todos los usuarios (GET) - Protegida**
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **Validaciones para la actualización de un usuario**
const updateUserValidators = [
    param('id').isInt().withMessage('El ID del usuario debe ser un número entero'),
    body('username').optional().isLength({ max: 50 }).withMessage('El nombre de usuario no puede tener más de 50 caracteres'),
    body('email').optional().isEmail().withMessage('El email debe ser válido'),
    body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

// **Actualizar un usuario (PUT)**
exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
        await user.update({ username, email, password: hashedPassword });

        res.status(200).json({ message: 'Usuario actualizado', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// **Validaciones para la eliminación de un usuario**
const deleteUserValidators = [
    param('id').isInt().withMessage('El ID del usuario debe ser un número entero'),
];

// **Eliminar un usuario (DELETE)**
exports.deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **Validaciones para el login**
const loginValidators = [
    body('email').isEmail().withMessage('El email es obligatorio y debe ser válido').optional(),
    body('username').isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres').optional(),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

// **Login de usuario (POST)**
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, username, password } = req.body;

        let user;
        if (email) {
            user = await User.findOne({ where: { email } });
        } else if (username) {
            user = await User.findOne({ where: { username } });
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login exitoso',
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **Exportar validaciones y funciones**
module.exports = {
    createUserValidators,
    updateUserValidators,
    deleteUserValidators,
    loginValidators,
    createUser: exports.createUser,
    getAllUsers: exports.getAllUsers,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
    login: exports.login
};
