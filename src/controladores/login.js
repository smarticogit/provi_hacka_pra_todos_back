const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const loginSchema = require('../validacoes/loginSchema');

const login = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        await loginSchema.validate(req.body);

        const usuarioEncontrado = await knex('usuarios_hacka').where({ usuario }).first();

        if (!usuarioEncontrado) {
            return res.status(400).json({ message: "Usuario ou senha não conferem" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ message: "Usuario ou senha não conferem" });
        }

        const token = jwt.sign({ id: usuarioEncontrado.id }, senhaHash, { expiresIn: '8h' });

        const { senha:_, ...dadosUsuario } = usuarioEncontrado;

        return res.status(201).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    login
}