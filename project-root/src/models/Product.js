const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Category = require('./Category'); // Não precisamos importar Category aqui para a definição inicial do Product, mas sim para a associação na tabela ProductCategory

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Valor padrão: produto desabilitado (0)
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Cada slug de produto deve ser único
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Valor padrão: 0 itens em estoque
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, // Pode ser nulo (preenchimento opcional)
  },
  price: {
    type: DataTypes.FLOAT, // Tipo de dado: número com casas decimais
    allowNull: false,
  },
  price_with_discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'products',
});

module.exports = Product;