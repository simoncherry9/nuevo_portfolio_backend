const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario creado', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
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


exports.deleteUser = async (req, res) => {
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

exports.login = async (req, res) => {
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
