const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlogPost = sequelize.define('BlogPost', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publishedAt: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN, 
        defaultValue: true, 
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,  // Mantiene los campos createdAt y updatedAt en la tabla
    freezeTableName: true,  // Evita que Sequelize pluralice el nombre de la tabla
    tableName: 'blogposts'  // Especificamos explícitamente el nombre de la tabla
});

module.exports = BlogPost;
