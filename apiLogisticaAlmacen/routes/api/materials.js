const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { existsMaterial } = require('../../helpers/middlewares/material.middleware');
const { newMaterial, materialId } = require('../../helpers/schemas/material.schema');
const { badRequest, serverError } = require('../../helpers/validators');
const { getAll, create, getById, update, deleteById } = require('../../models/material.model');

router.get('/', async (req, res) => {
    try {
        const materials = await getAll();
        res.json(materials);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.post('/',
    checkSchema(newMaterial),
    badRequest,
    async (req, res) => {
    try {
        console.log(typeof (res));
        const result = await create(req.body);
        const material = await getById(result.insertId);
        res.json(material);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.put('/:materialId',
    checkSchema({ ...materialId, ...newMaterial }),
    badRequest,
    existsMaterial,
    async (req, res) => {
    try {
        const result = await update(req.params.materialId, req.body);
        res.json(result);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.delete('/:materialId',
    checkSchema(materialId),
    badRequest,
    existsMaterial,
    async (req, res) => {
    try {
        const result = await deleteById(req.params.materialId);
        res.json(result);
    } catch (error) {
        serverError(res, error.message);
    }
});

module.exports = router;