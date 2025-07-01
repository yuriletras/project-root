// src/routes/userRoutes.js
const { Router } = require('express');
const UserController = require('../controllers/userController'); // Importa o controlador de usuários
const authMiddleware = require('../middleware/authMiddleware'); // Importa o middleware de autenticação

const router = new Router();

// Rotas para usuários

// Rota de criação de usuário:
// Esta rota NÃO precisa de autenticação, pois é usada para novos cadastros.
router.post('/', UserController.store);      // POST /users - Cria um novo usuário

// Rotas protegidas (exigem autenticação com JWT):
// O 'authMiddleware.verifyToken' será executado ANTES do controlador.
// Se o token for válido, a requisição segue para o controlador. Caso contrário, retorna um erro 401.
router.get('/', authMiddleware.verifyToken, UserController.index);        // GET /users - Lista todos os usuários
router.get('/:id', authMiddleware.verifyToken, UserController.show);      // GET /users/:id - Busca um usuário por ID
router.put('/:id', authMiddleware.verifyToken, UserController.update);    // PUT /users/:id - Atualiza um usuário por ID
router.delete('/:id', authMiddleware.verifyToken, UserController.delete); // DELETE /users/:id - Deleta um usuário por ID

module.exports = router;