const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo 'Profile'
const Profile = sequelize.define('Profile', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: false
    },
    correo_electronico: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imageurl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ciudad: {
      type: Sequelize.STRING,
      allowNull: true
    },
    provincia: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pais: {
      type: Sequelize.STRING,
      allowNull: true
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,  // Asegúrate de que Sequelize maneje automáticamente los timestamps
  });
  
  // Este modelo debería manejar automáticamente los campos createdAt y updatedAt
  

// Sincronizar el modelo con la base de datos
Profile.sync({ alter: true });

module.exports = Profile;
