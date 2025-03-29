const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const proyectsRoutes = require('./routes/proyectsRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const sociallinksRoutes = require('./routes/sociallinksRoutes');
const testimonialsRoutes = require('./routes/testimonialRoutes');
const certificatesRoutes = require('./routes/certificatesRoutes');
const ProfileRoutes = require('./routes/profileRoutes');
const estudiosRoutes = require('./routes/estudiosRoutes');
require('dotenv').config();

const morgan = require('morgan');
const cors = require('cors');

const app = express();

// CORS
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware para logs HTTP
app.use(morgan('dev'));

// Middleware para manejar JSON y datos de formularios
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', proyectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/social-links', sociallinksRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/profile', ProfileRoutes);
app.use('/api/estudios', estudiosRoutes);

// Función para iniciar el servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a la base de datos');

        await sequelize.sync({ force: false });

        const PORT = process.env.PORT || 3001;
        const server = app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });

        // Manejo del cierre de la BD
        const closeDatabase = async () => {
            console.log('🔔 Cerrando la conexión a la base de datos...');
            try {
                await sequelize.close();
                console.log('✅ Conexión a la base de datos cerrada');
                process.exit(0);
            } catch (err) {
                console.error('❌ Error al cerrar la conexión:', err);
                process.exit(1);
            }
        };

        process.on('SIGINT', closeDatabase);
        process.on('SIGTERM', closeDatabase);
        process.on('exit', closeDatabase);

    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    }
};

startServer();
