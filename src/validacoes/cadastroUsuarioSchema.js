const yup = require('./yup');

const cadastroUsuarioSchema = yup.object().shape({
    nome: yup
        .string()
        .required()
        .min(3),
    usuario: yup
        .string()
        .required()
        .min(5),
    senha: yup
        .string()
        .required()
        .min(5),
    email: yup
        .string()
        .email(),
    cep: yup
        .string()
        .email(),
    tipo_usuario: yup
        .string()
        .min(5),
});

module.exports = cadastroUsuarioSchema;