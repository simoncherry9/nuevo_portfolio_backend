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
        allowNull: false, // Ejemplo: "LinkedIn", "GitHub", "Twitter"
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false, // Enlace completo al perfil, ejemplo: https://www.linkedin.com/in/tu-nombre
    },
    icon: {
        type: DataTypes.STRING, // Aquí puedes guardar un nombre de icono o una URL al ícono, por ejemplo, "linkedin", "github"
        allowNull: true
    },
    category: {
        type: DataTypes.STRING, // Categoría de la red, como "Profesional", "Social", etc.
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = SocialLink;
