const { validationResult, body, param } = require('express-validator');
const Profile = require('../models/profile');

// Validaciones para la creación del perfil
const createProfileValidators = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio').isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('correo_electronico').notEmpty().withMessage('El correo electrónico es obligatorio').isEmail().withMessage('Correo electrónico no válido'),
    body('imageurl').optional().isURL().withMessage('La URL de la imagen no es válida'),
    body('ciudad').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('provincia').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('pais').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('descripcion').optional().isLength({ max: 500 }).withMessage('Máximo 500 caracteres'),
    body('tryhackme_url').optional().isURL().withMessage('La URL de TryHackMe no es válida'),  // Agregar validación para tryhackme_url
];

// Controlador para crear un perfil
exports.createProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nombre, apellido, correo_electronico, imageurl, ciudad, provincia, pais, descripcion, tryhackme_url } = req.body;
        const newProfile = await Profile.create({ 
            nombre, 
            apellido, 
            correo_electronico, 
            imageurl, 
            ciudad, 
            provincia, 
            pais, 
            descripcion,
            tryhackme_url // Incluir tryhackme_url en el perfil creado
        });

        res.status(201).json({ message: 'Perfil creado con éxito', newProfile });
    } catch (error) {
        console.error('Error al crear el perfil:', error);
        res.status(500).json({ error: 'Hubo un error al crear el perfil, inténtalo más tarde.' });
    }
};

// Validaciones para actualizar el perfil
const updateProfileValidators = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    body('nombre').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('apellido').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('correo_electronico').optional().isEmail().withMessage('Correo electrónico no válido'),
    body('imageurl').optional().isURL().withMessage('La URL de la imagen no es válida'),
    body('ciudad').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('provincia').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('pais').optional().isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
    body('descripcion').optional().isLength({ max: 500 }).withMessage('Máximo 500 caracteres'),
    body('tryhackme_url').optional().isURL().withMessage('La URL de TryHackMe no es válida'), // Validación para tryhackme_url
];

// Controlador para actualizar un perfil
exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { nombre, apellido, correo_electronico, imageurl, ciudad, provincia, pais, descripcion, tryhackme_url } = req.body;

        const profile = await Profile.findByPk(id);
        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        await profile.update({ 
            nombre: nombre || profile.nombre, 
            apellido: apellido || profile.apellido, 
            correo_electronico: correo_electronico || profile.correo_electronico, 
            imageurl: imageurl || profile.imageurl, 
            ciudad: ciudad || profile.ciudad, 
            provincia: provincia || profile.provincia, 
            pais: pais || profile.pais, 
            descripcion: descripcion || profile.descripcion,
            tryhackme_url: tryhackme_url || profile.tryhackme_url // Actualizar tryhackme_url
        });

        res.status(200).json({ message: 'Perfil actualizado con éxito', profile });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el perfil, inténtalo más tarde.' });
    }
};

// Obtener un perfil por su ID
exports.getProfileById = async (req, res) => {
    const { id } = req.params;

    try {
        const profile = await Profile.findByPk(id);

        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ error: 'Hubo un error al obtener el perfil, inténtalo más tarde.' });
    }
};

// Eliminar un perfil
const deleteProfileValidators = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
];

exports.deleteProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;

        const profile = await Profile.findByPk(id);
        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        await profile.destroy();
        res.status(200).json({ message: 'Perfil eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el perfil:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el perfil, inténtalo más tarde.' });
    }
};

// Obtener todos los perfiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error al obtener los perfiles:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los perfiles, inténtalo más tarde.' });
    }
};

module.exports = {
    createProfileValidators,
    updateProfileValidators,
    deleteProfileValidators,
    createProfile: exports.createProfile,
    updateProfile: exports.updateProfile,
    deleteProfile: exports.deleteProfile,
    getAllProfiles: exports.getAllProfiles,
    getProfileById: exports.getProfileById,
};
