const yup = require('./yup');

const loginSchema = yup.object().shape({
    usuario: yup
        .string()
        .required(),
    senha: yup
        .string()
        .required(),
});

module.exports = loginSchema;