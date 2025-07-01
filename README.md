# 🚀 Bend G-Tech: API de E-commerce (Em Desenvolvimento)

---

Bem-vindo ao repositório da API de E-commerce do projeto "Bend G-Tech"! Este projeto está sendo desenvolvido como parte do curso "Geração Tech", focando na criação de um backend robusto para uma plataforma de e-commerce.

Este repositório contém o código-fonte da **API RESTful**, responsável por gerenciar dados de usuários, produtos, categorias, autenticação e outras funcionalidades essenciais para uma loja virtual.

## 🌟 Status do Projeto

O projeto está em **desenvolvimento ativo**. As funcionalidades básicas para a gestão de usuários e autenticação já foram implementadas e testadas.

## ✨ Funcionalidades Atuais

* **Autenticação de Usuários (JWT):**
    * Registro de novos usuários (`POST /users`).
    * Login de usuários existentes (`POST /login`) com geração de JSON Web Tokens (JWT).
    * Proteção de rotas com middleware JWT, garantindo que apenas usuários autenticados possam acessar determinados recursos.
* **Gestão de Usuários (CRUD):**
    * Listar todos os usuários (`GET /users`).
    * Buscar usuário por ID (`GET /users/:id`).
    * Atualizar dados de um usuário (`PUT /users/:id`).
    * Deletar um usuário (`DELETE /users/:id`).

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript.
* **Express.js:** Framework web para Node.js, facilitando a criação de rotas e middlewares.
* **Sequelize:** ORM (Object-Relational Mapper) para Node.js, que simplifica a interação com bancos de dados relacionais.
* **MySQL:** Sistema de gerenciamento de banco de dados relacional.
* **Bcrypt.js:** Biblioteca para hash de senhas, garantindo a segurança das credenciais dos usuários.
* **JSON Web Token (JWT):** Padrão para criação de tokens de acesso seguros para autenticação.
* **Nodemon:** Ferramenta para monitorar e reiniciar o servidor automaticamente durante o desenvolvimento.
* **Dotenv:** Para gerenciar variáveis de ambiente.

## ⚙️ Como Rodar o Projeto

Para configurar e rodar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter instalado:

* **Node.js** (versão 18 ou superior)
* **NPM** (gerenciador de pacotes do Node.js)
* **MySQL Server** (ou Docker com MySQL)
* **Postman** ou **Insomnia** (para testar a API)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```
    *(Lembre-se de substituir `SEU_USUARIO` e `SEU_REPOSITORIO` pelo seu nome de usuário e nome do repositório no GitHub.)*

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Na raiz do projeto, crie um arquivo chamado `.env` e adicione as seguintes variáveis. **Certifique-se de preencher `SUA_SENHA_DO_MYSQL` e `SUA_CHAVE_SECRETA_DO_JWT` com seus próprios valores.**

    ```dotenv
    # .env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=SUA_SENHA_DO_MYSQL
    DB_NAME=meu_ecommerce
    DB_DIALECT=mysql
    PORT=3000
    JWT_SECRET=sua_chave_secreta_muito_segura_aqui_exemplo_abcdef1234567890!@#$%^&*()
    ```
    *Dica: Para `JWT_SECRET`, use uma string longa e aleatória para maior segurança.*

4.  **Configure o Banco de Dados:**
    * Certifique-se de que seu servidor MySQL está rodando.
    * O Sequelize irá criar as tabelas automaticamente quando o servidor for iniciado pela primeira vez (ou quando `sequelize.sync({ force: true })` for ativado). No arquivo `src/server.js`, a linha `sequelize.sync({ force: false })` pode ser alterada para `true` **temporariamente para recriar as tabelas** se houver alterações de modelo (Lembre-se de voltar para `false` após a recriação em desenvolvimento!).

### Rodando o Servidor

Para iniciar o servidor em modo de desenvolvimento (com Nodemon para recarga automática):

```bash
npm run dev


****
