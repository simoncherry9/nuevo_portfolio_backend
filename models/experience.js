const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
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
    modelName: 'BlogPost',
    tableName: 'blogposts',  // Aseguramos que la tabla siempre se llame 'blogposts'
    timestamps: true,
    freezeTableName: true,  // Evita que Sequelize cambie el nombre de la tabla a plural o cualquier otra forma no deseada
  }
);

module.exports = BlogPost;
