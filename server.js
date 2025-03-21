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

const configureMiddlewares = require('./middleware/middleware');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');  

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 

app.use(morgan('dev')); 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde',
});

app.use(limiter); 
configureMiddlewares(app);

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
