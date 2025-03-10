const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado 'Authorization'
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        // Verificar el token con JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Añadir el userId al request para que esté disponible en los controladores
        req.userId = decoded.userId;
        next();  // Llamamos a next() para continuar con la ejecución de la ruta
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
    }
};

module.exports = authMiddleware;
