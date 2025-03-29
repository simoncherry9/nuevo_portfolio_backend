const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const configureMiddlewares = (app) => {
    app.use(helmet()); 
    app.use(cors()); 
    app.use(express.json()); 
};

module.exports = configureMiddlewares;
