const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const proyectsRoutes = require('./routes/proyectsRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const sociallinksRoutes = require('./routes/sociallinksRoutes');
const testimonialsRoutes = require('./routes/testimonialRoutes');
require('dotenv').config();

const configureMiddlewares = require('./middleware/middleware');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');  // Importamos cors

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
const corsOptions = {
    origin: 'http://localhost:3000',  // Ahora el origen es el puerto del frontend (3000)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Aplicamos CORS con las opciones configuradas

app.use(morgan('dev'));  // Registros de las solicitudes HTTP

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 solicitudes por IP
    message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde',
});

app.use(limiter);  // Aplicamos el límite de solicitudes

configureMiddlewares(app);

app.use('/api/users', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/projects', proyectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/social-links', sociallinksRoutes);
app.use('/api/testimonials', testimonialsRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a la base de datos');

        await sequelize.sync({ force: false });

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    }
};

startServer();
