const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo 'Profile'
const Profile = sequelize.define('Profile', {
    nombre: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: false
    },
    imageurl: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: true
    },
    ciudad: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: true
    },
    provincia: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: true
    },
    pais: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,  // Usamos DataTypes en lugar de Sequelize
        allowNull: true
    }
}, {
    timestamps: true,  // Asegúrate de que Sequelize maneje automáticamente los timestamps
});

// Este modelo debería manejar automáticamente los campos createdAt y updatedAt

// Sincronizar el modelo con la base de datos
Profile.sync({ alter: true });

module.exports = Profile;
