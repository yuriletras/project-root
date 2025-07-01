const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Importa o modelo Product para criar a associação

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { // Define que esta coluna é uma chave estrangeira
      model: Product, // Faz referência ao modelo Product
      key: 'id',      // Referencia a coluna 'id' do modelo Product
    },
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  path: {
    type: DataTypes.STRING, // Caminho onde a imagem está salva no servidor
    allowNull: false,
  },
}, {
  timestamps: false, // Imagens de produto geralmente não precisam de 'createdAt'/'updatedAt'
  tableName: 'product_images',
});

// --- Definição da Associação (Relacionamento) ---
// Um Produto tem muitas Imagens (Product.hasMany(ProductImage))
Product.hasMany(ProductImage, {
  foreignKey: 'product_id', // A chave estrangeira na tabela ProductImage
  as: 'images',             // Como vamos chamar as imagens quando buscarmos um produto (ex: product.images)
  onDelete: 'CASCADE',      // Se um produto for deletado, suas imagens também serão
});
// Uma Imagem de Produto pertence a um Produto (ProductImage.belongsTo(Product))
ProductImage.belongsTo(Product, {
  foreignKey: 'product_id',
});

module.exports = ProductImage;