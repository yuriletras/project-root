const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');     // Importa o modelo Product
const Category = require('./Category');   // Importa o modelo Category

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Faz parte da chave primária composta (product_id + category_id)
    references: {
      model: Product,
      key: 'id',
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Faz parte da chave primária composta
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  timestamps: false, // Tabelas de junção geralmente não precisam de timestamps
  tableName: 'product_categories', // Nome da tabela no banco
});

// --- Definição da Associação Muitos-para-Muitos ---
// Um Produto pertence a MÚLTIPLAS Categorias, através da tabela ProductCategory
Product.belongsToMany(Category, {
  through: ProductCategory, // A tabela de junção
  foreignKey: 'product_id', // A chave estrangeira que aponta para Product na tabela de junção
  otherKey: 'category_id',  // A outra chave estrangeira que aponta para Category na tabela de junção
  as: 'categories',         // Como vamos chamar as categorias quando buscarmos um produto (ex: product.categories)
});

// Uma Categoria pertence a MÚLTIPLOS Produtos, através da tabela ProductCategory
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'category_id',
  otherKey: 'product_id',
  as: 'products',
});

module.exports = ProductCategory;