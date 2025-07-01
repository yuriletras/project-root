// src/controllers/AuthController.js
const User = require('../models/User'); // Importa o modelo User
const jwt = require('jsonwebtoken');     // Importa o jsonwebtoken

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Validação básica de entrada
      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      // 2. Busca o usuário pelo email
      const user = await User.findOne({ where: { email } });

      // Verifica se o usuário existe
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu email.' });
      }

      // 3. Compara a senha fornecida com a senha hasheada no banco de dados
      const isPasswordValid = await user.comparePassword(password);

      // Verifica se a senha é válida
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas. Verifique sua senha.' });
      }

      // 4. Se email e senha são válidos, gera um JWT
      const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload do token (informações do usuário)
        process.env.JWT_SECRET,           // Chave secreta do seu .env
        { expiresIn: '1h' }               // O token expira em 1 hora
      );

      // 5. Retorna o token para o cliente
      return res.json({ message: 'Login bem-sucedido!', token, user: { id: user.id, name: user.name, email: user.email } });

    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao tentar fazer login.' });
    }
  }
};