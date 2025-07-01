// src/routes/index.js
const { Router } = require('express');
const routes = new Router();

// --- Importação de Rotas de Usuário ---
// Garante que as rotas de gerenciamento de usuários (GET, POST, PUT, DELETE /users) estejam disponíveis
const userRoutes = require('./userRoutes');
routes.use('/users', userRoutes); // Todas as rotas em userRoutes.js terão o prefixo /users

// --- Importação e Definição da Rota de Autenticação ---
// Esta rota será usada para o login dos usuários
const AuthController = require('../controllers/AuthController');
routes.post('/login', AuthController.login); // Define a rota POST /login que chama o método login do AuthController

// --- Adicione outras rotas aqui conforme você as criar ---
// Exemplo:
// const categoryRoutes = require('./categoryRoutes');
// routes.use('/categories', categoryRoutes);

// const productRoutes = require('./productRoutes');
// routes.use('/products', productRoutes);

// Exporta o objeto 'routes' para ser usado no app.js
module.exports = routes;