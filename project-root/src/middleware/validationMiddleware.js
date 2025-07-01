const { check } = require('express-validator'); // Importa a função 'check' do express-validator

// Validações para a criação de um novo usuário
exports.validateUserCreate = [
  check('firstname').notEmpty().withMessage('O primeiro nome é obrigatório.'), // 'firstname' não pode ser vazio
  check('surname').notEmpty().withMessage('O sobrenome é obrigatório.'),
  check('email')
    .isEmail().withMessage('O email deve ser um endereço de email válido.') // Deve ser um formato de email válido
    .normalizeEmail(), // Normaliza o email (ex: "EMAIL@exemplo.com" -> "email@exemplo.com")
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
  check('confirmPassword').custom((value, { req }) => { // Validação customizada
    if (value !== req.body.password) { // Verifica se 'confirmPassword' é igual a 'password'
      throw new Error('As senhas não coincidem.');
    }
    return true; // Se forem iguais, a validação passa
  }),
];

// Validações para a atualização de um usuário (os campos são opcionais aqui)
exports.validateUserUpdate = [
  check('firstname').optional().notEmpty().withMessage('O primeiro nome não pode ser vazio.'), // 'optional()' permite que o campo não seja enviado
  check('surname').optional().notEmpty().withMessage('O sobrenome não pode ser vazio.'),
  check('email').optional().isEmail().withMessage('O email deve ser um endereço de email válido.').normalizeEmail(),
];

// Validações para Categorias (usaremos na Seção 03)
exports.validateCategoryCreate = [
  check('name').notEmpty().withMessage('O nome da categoria é obrigatório.'),
  check('slug').notEmpty().withMessage('O slug da categoria é obrigatório.'),
  check('use_in_menu').optional().isBoolean().withMessage('use_in_menu deve ser um booleano (true/false).'),
];

exports.validateCategoryUpdate = [
  check('name').optional().notEmpty().withMessage('O nome da categoria não pode ser vazio.'),
  check('slug').optional().notEmpty().withMessage('O slug da categoria não pode ser vazio.'),
  check('use_in_menu').optional().isBoolean().withMessage('use_in_menu deve ser um booleano (true/false).'),
];

// Validações para Produtos (usaremos na Seção 04)
exports.validateProductCreate = [
  check('name').notEmpty().withMessage('O nome do produto é obrigatório.'),
  check('slug').notEmpty().withMessage('O slug do produto é obrigatório.'),
  check('price').isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'), // 'gt: 0' significa "maior que zero"
  check('price_with_discount').isFloat({ min: 0 }).withMessage('O preço com desconto deve ser um número maior ou igual a zero.'), // 'min: 0' significa "maior ou igual a zero"
  check('category_ids').isArray().withMessage('category_ids deve ser um array de IDs de categoria.').optional(),
  check('images').isArray().withMessage('images deve ser um array de objetos de imagem.').optional(),
  check('options').isArray().withMessage('options deve ser um array de objetos de opção.').optional(),
];

exports.validateProductUpdate = [
  check('name').optional().notEmpty().withMessage('O nome do produto não pode ser vazio.'),
  check('slug').optional().notEmpty().withMessage('O slug do produto não pode ser vazio.'),
  check('price').optional().isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'),
  check('price_with_discount').optional().isFloat({ min: 0 }).withMessage('O preço com desconto deve ser um número maior ou igual a zero.'),
  check('category_ids').optional().isArray().withMessage('category_ids deve ser um array de IDs de categoria.'),
  check('images').optional().isArray().withMessage('images deve ser um array de objetos de imagem.'),
  check('options').optional().isArray().withMessage('options deve ser um array de objetos de opção.'),
];