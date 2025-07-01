// src/controllers/UserController.js
const User = require('../models/User'); // Importa o modelo User que você definiu

module.exports = {
  // Método para listar todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll(); // Busca todos os usuários no banco de dados
      return res.json(users); // Retorna os usuários como JSON
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao listar usuários.' });
    }
  },

  // Método para criar um novo usuário
  async store(req, res) {
    try {
      const { name, email, password } = req.body; // Pega os dados do corpo da requisição

      // Validação básica (você pode adicionar mais validações)
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      }

      // Cria um novo usuário no banco de dados
      const user = await User.create({ name, email, password });

      return res.status(201).json(user); // Retorna o usuário criado com status 201 (Created)
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      // Erro comum para email duplicado no MySQL é código 'ER_DUP_ENTRY'
      if (error.original && error.original.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Este email já está cadastrado.' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor ao criar usuário.' });
    }
  },

  // Você pode adicionar métodos para show (listar um único), update, delete aqui
  // Exemplo de show:
  async show(req, res) {
    try {
      const { id } = req.params; // Pega o ID da URL
      const user = await User.findByPk(id); // Busca o usuário pelo ID

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao buscar usuário.' });
    }
  },

  // Exemplo de update:
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Atualiza os dados do usuário
      await user.update({ name, email, password });

      return res.json(user); // Retorna o usuário atualizado
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao atualizar usuário.' });
    }
  },

  // Exemplo de delete:
  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await user.destroy(); // Deleta o usuário

      return res.status(204).send(); // Retorna status 204 (No Content) para sucesso na exclusão
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao deletar usuário.' });
    }
  }
};