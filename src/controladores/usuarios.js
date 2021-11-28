const cadastroUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');
const bcrypt = require('bcrypt');
const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const key = require('../senhaHash');

const cadastrarUsuario = async (req, res) => {
    const {
        nome,
        usuario,
        senha,
        telefone,
        email,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        cep,
        tipo_usuario
    } = req.body;

    try {
        await cadastroUsuarioSchema.validate(req.body);

        const existeUsuario = await knex('usuarios_hacka').where({ usuario }).first();

        if (existeUsuario) {
            return res.status(400).json({ erro: "Nome de usuario já existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            usuario,
            senha: senhaCriptografada,
            telefone,
            email,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            cep,
            tipo_usuario
        }

        const criarUsuario = await knex('usuarios_hacka').insert(dados).returning('*');

        if (!criarUsuario) {
            return res.status(400).json({ erro: "Usuário não cadastrado." });
        }

        return res.status(201).json({ mensagem: "Usuário Cadastrado com Sucesso!" });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
}
const listarUsuario = async (req, res) => {
    try {
        const listaUsuarios = await knex('usuarios_hacka');

        return res.status(200).json(listaUsuarios);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
}

module.exports = { cadastrarUsuario, listarUsuario };