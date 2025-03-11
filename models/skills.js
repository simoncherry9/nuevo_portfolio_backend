const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
        type: DataTypes.INTEGER, // Porcentaje o nivel de habilidad
        allowNull: false
    },
    category: {
        type: DataTypes.STRING, // Como "Frontend", "Backend", "DevOps", etc.
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN, // Estado de la habilidad
        defaultValue: true, // Se asume que la habilidad está activa por defecto
        allowNull: false
    }
});

module.exports = Skill;
