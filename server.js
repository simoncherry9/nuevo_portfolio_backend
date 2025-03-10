const express = require('express');
const sequelize = require('./config/database');  
const userRoutes = require('./routes/userRoutes');  
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const proyectsRoutes = require('./routes/proyectsRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
require('dotenv').config();  

const configureMiddlewares = require('./middleware/middleware');

const app = express();

configureMiddlewares(app);

app.use('/api/users', userRoutes); 
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/projects', proyectsRoutes);
app.use('/api/skills', skillsRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate(); 
        console.log('✅ Conectado a la base de datos');

        await sequelize.sync({ force: false }); 

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);  
    }
};

startServer();  
