const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
    nombre: {
        type: DataTypes.STRING,  
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,  
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,  
        allowNull: false
    },
    imageurl: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    ciudad: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    provincia: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    pais: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    tryhackme_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isURL: true
        }
    }
}, {
    timestamps: true,  
    freezeTableName: true,  // Esto evita que Sequelize pluralice el nombre de la tabla
    tableName: 'profiles'  // Especificamos explícitamente que debe usar la tabla 'profiles'
});

Profile.sync({ alter: true });

module.exports = Profile;
