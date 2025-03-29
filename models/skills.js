const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definimos el modelo Skill, pero ya debe usar la tabla 'skills' existente
const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proficiency: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    category: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN, 
        defaultValue: true, 
        allowNull: false
    }
}, {
    timestamps: true,  // Esto mantiene los campos createdAt y updatedAt en la tabla
    freezeTableName: true,  // Esto evita que Sequelize pluralice el nombre de la tabla
    tableName: 'skills'  // Especificamos explícitamente que debe usar la tabla 'skills'
});

module.exports = Skill;
