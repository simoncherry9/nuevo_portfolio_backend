// En certificates.js (Cambiar de import a require)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Certificate extends Model {}

Certificate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    academia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkimageurl: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
    modelName: 'Certificate',
    tableName: 'certificates',
    timestamps: true,
  }
);

module.exports = Certificate;
