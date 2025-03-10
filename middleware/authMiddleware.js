const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.userId;
        next();  
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
    }
};

module.exports = authMiddleware;
