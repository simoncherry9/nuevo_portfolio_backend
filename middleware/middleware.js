const express = require('express'); // Importa express
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Configuración de middlewares
const configureMiddlewares = (app) => {
    app.use(helmet()); // Seguridad: Protege cabeceras HTTP
    app.use(cors()); // Permite acceso desde diferentes dominios
    app.use(express.json()); // Acepta y parsea JSON
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Limita 100 peticiones por cada 15 minutos
};

module.exports = configureMiddlewares;
