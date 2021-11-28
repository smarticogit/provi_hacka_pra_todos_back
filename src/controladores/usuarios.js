const cadastroUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');
const bcrypt = require('bcrypt');
const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const key = require('../senhaHash');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, cpf, tel } = req.body;

    try {
        await cadastroUsuarioSchema.validate(req.body);

        const existeUsuario = await knex('usuarios_hacka').where({ email }).first();

        if (existeUsuario) {
            return res.status(400).json({ message: "O email já existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            email,
            senha: senhaCriptografada
        }

        const usuario = await knex('usuarios_hacka').insert(dados).returning('*');

        if (!usuario) {
            return res.status(400).json({ message: "Usuário não cadastrado." });
        }

        return res.status(200).json({ message: "Usuário Cadastrado com Sucesso!" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
const listarUsuario = async (req, res) => {
    return res.status(200).json({ message: "Listar Usuário" });
}



module.exports = { cadastrarUsuario, listarUsuario };