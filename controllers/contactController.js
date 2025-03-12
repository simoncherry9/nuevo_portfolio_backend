const { validationResult, body, param } = require('express-validator');  
const ContactMessage = require('../models/contact');

// Validadores para crear un mensaje de contacto
const createContactMessageValidators = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('Debe ser un correo electrónico válido')
        .isLength({ max: 100 }).withMessage('El correo electrónico no puede tener más de 100 caracteres'),
    body('message')
        .notEmpty().withMessage('El mensaje es obligatorio')
        .isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres')
];

// Validadores para actualizar un mensaje de contacto
const updateContactMessageValidators = [
    param('id')
        .isInt().withMessage('El ID del mensaje debe ser un número entero'),  
    body('name')
        .optional()
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un correo electrónico válido')
        .isLength({ max: 100 }).withMessage('El correo electrónico no puede tener más de 100 caracteres'),
    body('message')
        .optional()
        .isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres'),
];

// Validadores para eliminar un mensaje de contacto
const deleteContactMessageValidators = [
    param('id').isInt().withMessage('El ID del mensaje debe ser un número entero'),
];

// Controlador para crear un mensaje de contacto
exports.createContactMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, message } = req.body;

        const contactMessage = await ContactMessage.create({ name, email, message });
        res.status(201).json({ message: 'Mensaje de contacto creado con éxito', contactMessage });
    } catch (error) {
        console.error('Error al crear el mensaje de contacto:', error);
        res.status(500).json({ error: 'Hubo un error al crear el mensaje de contacto, inténtalo más tarde.' });
    }
};

// Controlador para actualizar un mensaje de contacto
exports.updateContactMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { name, email, message } = req.body;

        const contactMessage = await ContactMessage.findByPk(id);
        if (!contactMessage) {
            return res.status(404).json({ message: 'Mensaje de contacto no encontrado' });
        }

        await contactMessage.update({ name, email, message });
        res.status(200).json({ message: 'Mensaje de contacto actualizado con éxito', contactMessage });
    } catch (error) {
        console.error('Error al actualizar el mensaje de contacto:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el mensaje de contacto, inténtalo más tarde.' });
    }
};

// Controlador para eliminar un mensaje de contacto
exports.deleteContactMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const contactMessage = await ContactMessage.findByPk(id);
        if (!contactMessage) {
            return res.status(404).json({ message: 'Mensaje de contacto no encontrado' });
        }

        await contactMessage.destroy();
        res.status(200).json({ message: 'Mensaje de contacto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el mensaje de contacto:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el mensaje de contacto, inténtalo más tarde.' });
    }
};

// Controlador para obtener todos los mensajes de contacto
exports.getAllContactMessages = async (req, res) => {
    try {
        const contactMessages = await ContactMessage.findAll();
        res.status(200).json(contactMessages);
    } catch (error) {
        console.error('Error al obtener los mensajes de contacto:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los mensajes de contacto, inténtalo más tarde.' });
    }
};

module.exports = {
    createContactMessageValidators,
    updateContactMessageValidators,
    deleteContactMessageValidators,
    createContactMessage: exports.createContactMessage,
    updateContactMessage: exports.updateContactMessage,
    deleteContactMessage: exports.deleteContactMessage,
    getAllContactMessages: exports.getAllContactMessages
};
