const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

rotas.post('/api/usuarios', usuarios.cadastrarUsuario);
rotas.post('/api/login', login.login);

rotas.use(verificaLogin);

rotas.get('/api/usuarios', usuarios.listarUsuario);

module.exports = rotas;