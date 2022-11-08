const router = require('express').Router();
const { getAll, create, getById, update } = require('../../models/material.model');

router.get('/', async (req, res) => {
    try {
        const materials = await getAll();
        res.json(materials);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        const material = await getById(result.insertId);
        res.json(material);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:materialId', async (req, res) => {
    try {
        const result = await update(req.params.materialId, req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;