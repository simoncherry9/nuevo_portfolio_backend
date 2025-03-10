const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    jobTitle: {
        type: DataTypes.STRING, // Ejemplo: "CEO de XYZ"
        allowNull: true
    },
    company: {
        type: DataTypes.STRING, // Empresa o lugar de trabajo
        allowNull: true
    }
});

module.exports = Testimonial;
