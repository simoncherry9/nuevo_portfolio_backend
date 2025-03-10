const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');

const app = express();

// Seguridad y middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 peticiones cada 15 min

// Test de conexión a la DB
sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
