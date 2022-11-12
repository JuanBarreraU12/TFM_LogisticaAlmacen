const { validationResult } = require('express-validator');

const badRequest = (req, res, next) => {
    const error = validationResult(req)
    const arr = error.errors.map((err) => {
        return {
            campo: err.param,
            error: err.msg
        }
    });

    if (arr.length > 0) {
        return res.status(400).json(arr);
    }
    next();
}

const serverError = (res, msg) => {
    res.status(500).json({error: msg});
}

const notFound = (res, msg) => {
    res.status(404).json({ error: msg });
}

module.exports = {
    badRequest,
    serverError,
    notFound
}