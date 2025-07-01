// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken

module.exports = {
  verifyToken(req, res, next) {
    // 1. Obter o token do cabeçalho da requisição
    // O token geralmente vem no formato "Bearer SEU_TOKEN_AQUI"
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido.' });
    }

    // Divide o cabeçalho para pegar apenas o token (ignora o "Bearer ")
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Formato do token inválido (Bearer token).' });
    }

    const [scheme, token] = parts; // scheme será "Bearer", token será o JWT

    if (scheme !== 'Bearer') {
      return res.status(401).json({ error: 'Formato do token inválido (Espera-se Bearer).' });
    }

    // 2. Verificar o token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Erro na verificação do token:', err);
        // Se o token for inválido (expirado, modificado, etc.), retorna erro 401
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
      }

      // 3. Se o token é válido, armazena o ID do usuário (do payload do token) na requisição
      // Isso permite que seus controladores saibam qual usuário está fazendo a requisição
      req.userId = decoded.id;
      req.userEmail = decoded.email; // Opcional: armazenar também o email

      // 4. Continua para a próxima função middleware ou para o controlador da rota
      return next();
    });
  }
};