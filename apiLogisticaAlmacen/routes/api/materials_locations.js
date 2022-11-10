const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { badRequest, serverError } = require('../../helpers/validators');
const { newMaterialLocation } = require('../../helpers/schemas/material_location.schema');
const { create, getAll, getByWarehouse, getByLocation, getByMaterial } = require('../../models/material_location.model');

router.get('/', async (req, res) => {
    try {
        const materials_locations = await getAll(); 
        res.json(materials_locations);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.get('/warehouses/:warehouseId', async (req, res) => {
    try {
        const materials_locations = await getByWarehouse(req.params.warehouseId, req.query);
        res.json(materials_locations);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.post('/',
    checkSchema(newMaterialLocation),
    badRequest,
    async (req, res) => {
    try {
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        serverError(res, error.message);
    }
});

module.exports = router;