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
        type: DataTypes.STRING, 
        allowNull: false
    },
    link: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN, 
        defaultValue: true, 
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    image1: {
        type: DataTypes.STRING(500),  
        allowNull: true
    },
    image2: {
        type: DataTypes.STRING(500), 
        allowNull: true
    },
    image3: {
        type: DataTypes.STRING(500),  
        allowNull: true
    },
    image4: {
        type: DataTypes.STRING(500), 
        allowNull: true
    },
    image5: {
        type: DataTypes.STRING(500),  
        allowNull: true
    }
});

module.exports = Project;
