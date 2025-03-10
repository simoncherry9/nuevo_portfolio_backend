const express = require('express');
const sequelize = require('./config/database');  
const userRoutes = require('./routes/userRoutes');  
require('dotenv').config();  

const configureMiddlewares = require('./middleware/middleware');

const app = express();

configureMiddlewares(app);

app.use('/api/users', userRoutes); 

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
