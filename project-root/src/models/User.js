// src/models/User.js
const { DataTypes } = require('sequelize'); // Importa DataTypes para definir os tipos de colunas
const sequelize = require('../config/database'); // Importa a instância do Sequelize para usar a conexão
const bcrypt = require('bcryptjs'); // Importa o bcryptjs para criptografar senhas

// Define o modelo 'User' (que Sequelize transformará na tabela 'users' no banco)
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,      // Tipo de dado: número inteiro
    autoIncrement: true,          // O valor será gerado automaticamente (1, 2, 3...)
    primaryKey: true,             // É a chave primária da tabela (identificador único)
  },
  // CAMPO 'name' SIMPLIFICADO - Substitui 'firstname' e 'surname'
  name: {
    type: DataTypes.STRING,       // Tipo de dado: texto (string)
    allowNull: false,             // Não pode ser nulo (preenchimento obrigatório)
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,                 // Cada email deve ser único no banco de dados
    validate: {
      isEmail: true,              // O Sequelize vai validar se é um formato de email válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Opções do modelo
  timestamps: true, // 'createdAt' e 'updatedAt' serão adicionadas automaticamente
  tableName: 'users', // Define explicitamente o nome da tabela no banco de dados
});

// Hook (Gancho): Antes de criar um novo usuário no banco, execute esta função.
// Usamos isso para criptografar a senha antes de salvá-la, por segurança.
User.beforeCreate(async (user) => {
  if (user.password) { // Se o usuário forneceu uma senha
    const salt = await bcrypt.genSalt(10); // Gera um "salt" (valor aleatório) para aumentar a segurança do hash
    user.password = await bcrypt.hash(user.password, salt); // Criptografa a senha e armazena o hash
  }
});

// Método de Instância: Adiciona um método ao objeto do usuário para comparar senhas.
// Usaremos isso para verificar se a senha que o usuário digitou no login é a mesma que está hasheada no banco.
User.prototype.comparePassword = async function(candidatePassword) {
  // Compara a senha fornecida ('candidatePassword') com a senha hasheada ('this.password')
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User; // Exporta o modelo 'User' para ser usado em outras partes da aplicação