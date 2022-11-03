const { validationResult } = require('express-validator');


const nuevoUsuario = {
    user_name: {
        exists: true,
        errorMessage: 'El campo user_name es obligatgorio'
    },
}

const checkError = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json(error.mapped());
    }
    next()
}

module.exports = {
    nuevoUsuario, checkError
}