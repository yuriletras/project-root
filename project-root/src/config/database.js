require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const { Sequelize } = require('sequelize'); // Importa a classe Sequelize

// Cria uma nova instância do Sequelize para se conectar ao banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nome do banco de dados (ex: 'meu_ecommerce')
  process.env.DB_USER,      // Usuário do banco de dados (ex: 'root')
  process.env.DB_PASSWORD,  // Senha do usuário do banco de dados
  {
    host: process.env.DB_HOST,    // Onde o banco de dados está rodando (ex: 'localhost')
    dialect: process.env.DB_DIALECT, // Qual tipo de banco de dados estamos usando ('mysql' neste caso)
    logging: true, // Se 'true', o Sequelize mostra no terminal os comandos SQL que ele executa
    define: {
      timestamps: true, // Adiciona automaticamente as colunas 'createdAt' e 'updatedAt' em todas as tabelas
      underscored: true, // Transforma nomes de colunas como 'myColumn' em 'my_column' no banco de dados
    },
  }
);

module.exports = sequelize; // Exporta a instância do Sequelize para ser usada em outros arquivos