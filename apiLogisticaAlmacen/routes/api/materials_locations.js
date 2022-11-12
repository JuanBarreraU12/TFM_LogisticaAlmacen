const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { badRequest, serverError } = require('../../helpers/validators');
const { newMaterialLocation, warehouseParam, locationParam } = require('../../helpers/schemas/material_location.schema');
const { create, getAll, getByLocationWithPages } = require('../../models/material_location.model');

router.get('/:warehouseId',
    checkSchema(warehouseParam),
    badRequest,
    async (req, res) => {
    const { warehouseId } = req.params;
    try {
        const materials_locations = await getAll(warehouseId); 
        res.json(materials_locations);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.get('/:warehouseId/locations/:locationId',
    checkSchema({...warehouseParam, ...locationParam}),
    badRequest,
    async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { warehouseId, locationId } = req.params;
    try {
        const materials_locations = await getByLocationWithPages(warehouseId, locationId, parseInt(page), parseInt(limit));
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