const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Experience = sequelize.define('Experience', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, // Ejemplo: "Desarrollador Web", "Analista de Seguridad"
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false, // Nombre de la empresa o proyecto
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false, // Fecha de inicio del puesto o proyecto
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true, // Fecha de finalización (puede ser nula si sigue activo)
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, // Descripción detallada de lo que hiciste en esa posición o proyecto
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Experience;
