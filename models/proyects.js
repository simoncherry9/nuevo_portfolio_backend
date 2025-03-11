const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    technologies: {
        type: DataTypes.STRING, // Lista de tecnologías usadas en el proyecto
        allowNull: false
    },
    link: {
        type: DataTypes.STRING, // Enlace al proyecto
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN, // Indicador de si el proyecto está activo
        defaultValue: true, // Por defecto, un proyecto es activo
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Project;
