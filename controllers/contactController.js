const { validationResult, body, param } = require('express-validator');  
const ContactMessage = require('../models/contact');


const createContactMessageValidators = [
    body('title').notEmpty().withMessage('El título es obligatorio').isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('content').notEmpty().withMessage('El contenido es obligatorio').isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('author').notEmpty().withMessage('El autor es obligatorio').isLength({ max: 50 }).withMessage('El autor no puede tener más de 50 caracteres'),
];


exports.createContactMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content, author } = req.body;

        
        const contactMessage = await ContactMessage.create({ title, content, author });
        res.status(201).json({ message: 'Mensaje de contacto creado con éxito', contactMessage });
    } catch (error) {
        console.error('Error al crear el mensaje de contacto:', error);
        res.status(500).json({ error: 'Hubo un error al crear el mensaje de contacto, inténtalo más tarde.' });
    }
};


const updateContactMessageValidators = [
    param('id').isInt().withMessage('El ID del mensaje debe ser un número entero'),  
    body('title').optional().isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('content').optional().isLength({ min: 10 }).withMessage('El contenido debe tener al menos 10 caracteres'),
    body('author').optional().isLength({ max: 50 }).withMessage('El autor no puede tener más de 50 caracteres'),
];


exports.updateContactMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        const contactMessage = await ContactMessage.findByPk(id);
        if (!contactMessage) {
            return res.status(404).json({ message: 'Mensaje de contacto no encontrado' });
        }

        await contactMessage.update({ title, content, author });
        res.status(200).json({ message: 'Mensaje de contacto actualizado con éxito', contactMessage });
    } catch (error) {
        console.error('Error al actualizar el mensaje de contacto:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el mensaje de contacto, inténtalo más tarde.' });
    }
};


const deleteContactMessageValidators = [
    param('id').isInt().withMessage('El ID del mensaje debe ser un número entero'),
];


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
