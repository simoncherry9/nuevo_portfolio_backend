const express = require('express');
const sequelize = require('./config/database');  // Importar sequelize directamente
const userRoutes = require('./routes/userRoutes');  // Rutas de usuario
require('dotenv').config();  // Cargar variables de entorno

// Importar middlewares desde middleware.js
const configureMiddlewares = require('./middleware/middleware');

const app = express();

// Aplicar los middlewares
configureMiddlewares(app);

// Rutas
app.use('/api/users', userRoutes); // Aquí añades las rutas de usuarios

// Conexión a la base de datos
const startServer = async () => {
    try {
        await sequelize.authenticate(); // Verifica la conexión con la base de datos
        console.log('✅ Conectado a la base de datos');

        await sequelize.sync({ force: false }); // Sincroniza los modelos de Sequelize (sin borrar tablas)

        // Inicia el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);  // Detenemos el servidor si no se conecta a la base de datos
    }
};

startServer();  // Ejecuta la función para iniciar el servidor
