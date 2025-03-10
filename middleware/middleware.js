const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const configureMiddlewares = (app) => {
    app.use(helmet()); 
    app.use(cors()); 
    app.use(express.json()); 
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); 
};

module.exports = configureMiddlewares;
