const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear usuario
exports.createUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'No se enviaron datos en la petición' });
        }

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'No se enviaron datos en la petición' });
        }
        
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

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login de usuario (solo con email)
exports.login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'No se enviaron datos en la petición' });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Se requiere email y contraseña' });
        }

        const user = await User.findOne({ where: { email } });

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

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: error.message });
    }
};
