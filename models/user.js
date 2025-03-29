const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definimos el modelo User, pero ya debe usar la tabla 'users' existente
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,  // Esto mantiene los campos createdAt y updatedAt en la tabla
    freezeTableName: true,  // Esto evita que Sequelize pluralice el nombre de la tabla
    tableName: 'users'  // Especificamos explícitamente que debe usar la tabla 'users'
});

module.exports = User;
