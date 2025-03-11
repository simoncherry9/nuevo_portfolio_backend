const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SocialLink = sequelize.define('SocialLink', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    icon: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    category: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = SocialLink;
