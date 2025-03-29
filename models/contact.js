const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class ContactMessage extends Model {}

ContactMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'ContactMessage',
    tableName: 'contactmessages',  // Aseguramos que la tabla siempre se llame 'contactmessages'
    timestamps: true,
    freezeTableName: true,  // Esto evita que Sequelize pluralice el nombre de la tabla
  }
);

module.exports = ContactMessage;
