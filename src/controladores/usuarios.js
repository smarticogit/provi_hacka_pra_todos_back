const bcrypt = require('bcrypt');
const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const key = require('../senhaHash');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, cpf, tel } = req.body;

    try {
        const existeUsuario = await knex('usuarios').where({ email }).first();

        if (existeUsuario) {
            return res.status(400).json({ message: "O email já existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            email,
            senha: senhaCriptografada,
            cpf,
            tel
        }

        const usuario = await knex('usuarios').insert(dados).returning('*');

        if (!usuario) {
            return res.status(400).json({ message: "Usuário não cadastrado." });
        }

        return res.status(200).json({ message: "Usuário Cadastrado com Sucesso!" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { cadastrarUsuario };