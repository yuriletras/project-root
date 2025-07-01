// src/app.js
const express = require('express');
const app = express();

// Middleware para processar JSON (MUITO IMPORTANTE VIR ANTES DAS ROTAS)
app.use(express.json());

// Importa o arquivo de rotas principal
const routes = require('./routes'); // O caminho deve ser relativo a src/app.js
app.use(routes); // Usa todas as rotas definidas em src/routes/index.js

// Exporta a instância 'app'
module.exports = app;