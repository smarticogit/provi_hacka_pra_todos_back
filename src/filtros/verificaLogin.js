const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, senhaHash);

        const usuarioSelect = await knex('usuarios').where('id', id).first();

        if (!usuarioSelect) {
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }

        const { senha, ...usuario } = usuarioSelect;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = verificaLogin