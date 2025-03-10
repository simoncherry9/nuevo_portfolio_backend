// middleware/validationMiddleware.js

const { validationResult } = require('express-validator');

// Middleware para manejar las validaciones
const validateRequest = (req, res, next) => {
    const errors = validationResult(req); // Obtiene los errores de validación
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Si hay errores, devuelve una respuesta con el error
    }
    next(); // Si no hay errores, pasa al siguiente middleware o controlador
};

module.exports = validateRequest;
