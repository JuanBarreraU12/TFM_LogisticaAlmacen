const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { badRequest, serverError } = require('../../helpers/validators');
const { newMaterialLocation, warehouseParams } = require('../../helpers/schemas/material_location.schema');
const { create, getAll, getByWarehouse, getByLocation, getByMaterial } = require('../../models/material_location.model');

router.get('/', async (req, res) => {
    try {
        const materials_locations = await getAll(); 
        res.json(materials_locations);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.get('/warehouses/:warehouseId',
    checkSchema(warehouseParams),
    badRequest,
    async (req, res) => {
    const { page = 1, limit = 10, locationId } = req.query;
    const { warehouseId } = req.params;
    try {
        const materials_locations = await getByWarehouse(warehouseId, locationId, parseInt(page), parseInt(limit));
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