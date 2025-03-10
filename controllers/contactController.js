const ContactMessage = require('../models/contact');

// Crear un mensaje de contacto (POST) - Protegida por autenticación
exports.createContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Crear un nuevo mensaje de contacto
        const contactMessage = await ContactMessage.create({ name, email, message });
        res.status(201).json({ message: 'Mensaje de contacto creado con éxito', contactMessage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los mensajes de contacto (GET) - Ruta pública
exports.getAllContactMessages = async (req, res) => {
    try {
        const contactMessages = await ContactMessage.findAll();
        res.status(200).json(contactMessages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un mensaje de contacto (PUT) - Protegida por autenticación
exports.updateContactMessage = async (req, res) => {
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
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un mensaje de contacto (DELETE) - Protegida por autenticación
exports.deleteContactMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const contactMessage = await ContactMessage.findByPk(id);
        if (!contactMessage) {
            return res.status(404).json({ message: 'Mensaje de contacto no encontrado' });
        }

        await contactMessage.destroy();
        res.status(200).json({ message: 'Mensaje de contacto eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
