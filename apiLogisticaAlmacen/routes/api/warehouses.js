const router = require('express').Router();
const { getAll } = require('../../models/warehouse.model');
const { serverError } = require('../../helpers/validators');

router.get('/', async (req, res) => {
    try {
        const warehouses = await getAll();
        res.json(warehouses);
    } catch (error) {
        serverError(res, error.message);
    }
});

module.exports = router;