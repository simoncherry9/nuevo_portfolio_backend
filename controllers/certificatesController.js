const { validationResult, body, param } = require('express-validator');
const Certificate = require('../models/certificates');

const createCertificateValidators = [
    body('titulo').notEmpty().withMessage('El título es obligatorio').isLength({ max: 255 }).withMessage('El título no puede tener más de 255 caracteres'),
    body('academia').notEmpty().withMessage('El nombre de la academia es obligatorio').isLength({ max: 255 }).withMessage('El nombre de la academia no puede tener más de 255 caracteres'),
    body('startdate').isISO8601().withMessage('La fecha de inicio debe ser una fecha válida en formato ISO 8601'),
    body('enddate').optional().isISO8601().withMessage('La fecha de finalización debe ser una fecha válida en formato ISO 8601'),
    body('descripcion').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('linkimageurl').optional().isURL().withMessage('El enlace de la imagen debe ser una URL válida'),
];

const getCertificateByIdValidators = [
    param('id').isInt().withMessage('El ID del certificado debe ser un número entero'),
];


const createCertificate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { titulo, academia, startdate, enddate, descripcion, linkimageurl } = req.body;

        if (enddate && new Date(startdate) > new Date(enddate)) {
            return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la fecha de finalización' });
        }

        const certificate = await Certificate.create({ titulo, academia, startdate, enddate, descripcion, linkimageurl });
        res.status(201).json({ message: 'Certificado creado', certificate });
    } catch (error) {
        console.error('Error al crear el certificado:', error);
        res.status(500).json({ error: 'Hubo un error al crear el certificado, inténtalo más tarde.' });
    }
};

const getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.findAll();
        res.status(200).json(certificates);
    } catch (error) {
        console.error('Error al obtener los certificados:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los certificados, inténtalo más tarde.' });
    }
};

const getActiveCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.findAll({
            where: {
                enddate: null  
            }
        });
        res.status(200).json(certificates);
    } catch (error) {
        console.error('Error al obtener los certificados activos:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los certificados activos, inténtalo más tarde.' });
    }
};

const updateCertificateValidators = [
    param('id').isInt().withMessage('El ID del certificado debe ser un número entero'),
    body('titulo').optional().isLength({ max: 255 }).withMessage('El título no puede tener más de 255 caracteres'),
    body('academia').optional().isLength({ max: 255 }).withMessage('El nombre de la academia no puede tener más de 255 caracteres'),
    body('startdate').optional().isISO8601().withMessage('La fecha de inicio debe ser una fecha válida en formato ISO 8601'),
    body('enddate').optional().isISO8601().withMessage('La fecha de finalización debe ser una fecha válida en formato ISO 8601'),
    body('descripcion').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('linkimageurl').optional().isURL().withMessage('El enlace de la imagen debe ser una URL válida'),
];

const getCertificateById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const certificate = await Certificate.findByPk(id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }

        res.status(200).json(certificate);
    } catch (error) {
        console.error('Error al obtener el certificado:', error);
        res.status(500).json({ error: 'Hubo un error al obtener el certificado, inténtalo más tarde.' });
    }
};

const updateCertificate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { titulo, academia, startdate, enddate, descripcion, linkimageurl } = req.body;

        const certificate = await Certificate.findByPk(id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }

        if (startdate && enddate && new Date(startdate) > new Date(enddate)) {
            return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la fecha de finalización' });
        }

        await certificate.update({ titulo, academia, startdate, enddate, descripcion, linkimageurl });
        res.status(200).json({ message: 'Certificado actualizado', certificate });
    } catch (error) {
        console.error('Error al actualizar el certificado:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el certificado, inténtalo más tarde.' });
    }
};

const deleteCertificateValidators = [
    param('id').isInt().withMessage('El ID del certificado debe ser un número entero'),
];

const deleteCertificate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const certificate = await Certificate.findByPk(id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }

        await certificate.destroy();
        res.status(200).json({ message: 'Certificado eliminado' });
    } catch (error) {
        console.error('Error al eliminar el certificado:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el certificado, inténtalo más tarde.' });
    }
};

module.exports = {
    createCertificateValidators,
    updateCertificateValidators,
    deleteCertificateValidators,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    getAllCertificates,
    getActiveCertificates,
    getCertificateById,
    getCertificateByIdValidators
};

