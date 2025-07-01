require('dotenv').config(); // Carrega as variáveis de ambiente (como a porta do servidor)
const app = require('./app'); // Importa a configuração do Express
const sequelize = require('./config/database'); // Importa nossa instância do Sequelize

const PORT = process.env.PORT || 3000; // Define a porta do servidor, usando a variável de ambiente ou 3000 por padrão

// IMPORTANTE: Importe TODOS os seus modelos aqui para que o Sequelize saiba quais tabelas ele precisa criar/sincronizar.
require('./models/User');
require('./models/Category');
require('./models/Product');
require('./models/ProductImage');
require('./models/ProductOption');
require('./models/ProductCategory'); // O modelo da tabela de associação (muitos-para-muitos)

// Sincroniza o Sequelize com o banco de dados.
// Ele vai verificar se as tabelas existem e criá-las se não existirem.
// CUIDADO: { force: true } - DELETA todas as tabelas e as recria. Use SOMENTE em desenvolvimento!
// Para produção ou em fases avançadas de desenvolvimento, use ferramentas de "migração".
sequelize.sync({ force: true })
  .then(() => {
    // Se a sincronização foi bem-sucedida, inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log('Banco de dados sincronizado! Tabelas criadas/verificadas.');
    });
  })
  .catch(err => {
    // Se houve um erro ao sincronizar o banco, ele será exibido aqui
    console.error('Erro ao sincronizar o banco de dados:', err);
  });