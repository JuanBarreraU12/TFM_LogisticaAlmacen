const { getById } = require('../../models/material.model');
const { notFound, serverError } = require('../../helpers/validators');

const existsMaterial = async (req, res, next) => {
    try {
        const material = await getById(req.params.materialId);
        if (!material)
            return notFound(res, 'El material no existe');
        next();
    } catch (error) {
        return serverError(res, error.message);
    }
}

module.exports = {
    existsMaterial
}