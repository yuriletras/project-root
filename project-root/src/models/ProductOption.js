const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Importa o modelo Product

const ProductOption = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING, // Título da opção (ex: 'Cor', 'Tamanho')
    allowNull: false,
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'), // Apenas 'square' ou 'circle' são permitidos
    defaultValue: 'square',
  },
  radius: {
    type: DataTypes.INTEGER, // Valor do border-radius (se a forma for 'square')
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('text', 'color'), // Tipo do input (ex: 'text' para P/M/G, 'color' para #FF0000)
    defaultValue: 'text',
  },
  values: {
    type: DataTypes.STRING, // Armazena todas as opções como uma string separada por vírgula (ex: "P,M,G" ou "#FFF,#000")
    allowNull: false,
    // Métodos 'get' e 'set' para converter entre string e array automaticamente
    get() {
      const rawValue = this.getDataValue('values');
      return rawValue ? rawValue.split(',') : []; // Ao ler, converte a string para um array
    },
    set(value) {
      this.setDataValue('values', Array.isArray(value) ? value.join(',') : value); // Ao salvar, converte o array para string
    }
  },
}, {
  timestamps: false, // Opções de produto geralmente não precisam de 'createdAt'/'updatedAt'
  tableName: 'product_options',
});

// --- Definição da Associação ---
// Um Produto tem muitas Opções (Product.hasMany(ProductOption))
Product.hasMany(ProductOption, {
  foreignKey: 'product_id',
  as: 'options',
  onDelete: 'CASCADE',
});
// Uma Opção de Produto pertence a um Produto (ProductOption.belongsTo(Product))
ProductOption.belongsTo(Product, {
  foreignKey: 'product_id',
});

module.exports = ProductOption;