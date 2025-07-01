const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Cada slug deve ser único (ex: 'calcados', 'eletronicos')
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN, // Tipo booleano (true/false, 1/0)
    defaultValue: false,     // Valor padrão é 'false' (0)
  },
}, {
  timestamps: true,
  tableName: 'categories',
});

module.exports = Category;